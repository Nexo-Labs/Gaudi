import Stripe from 'stripe';
import { env } from '$env/dynamic/private';
import type { Optional } from '../domain/common/Optional.js';
import type { UserModel } from '../domain/user-model.js';
import { relativeUrls } from '../domain/routing.js';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
	apiVersion: '2024-06-20'
});

async function getPricesWithProduct(): Promise<Stripe.Price[]> {
	return (
		await stripe.prices.list({
			expand: ['data.product']
		})
	).data;
}

type ProductWithPrices = Stripe.Product & {
	prices: Stripe.Price[];
};

type SubscriptionCanceled = {
	isCanceled: boolean;
	cancelAt: number | null;
};

type UserSubscription = {
	priceId: string;
	subscriptionId: string;
	productId: string;
	canceled?: SubscriptionCanceled;
};

export async function getSubscriptionsByUser(user: UserModel): Promise<UserSubscription[]> {
	const result = await stripe.customers.list({ email: user.email });
	const customer = result.data.length ? result.data[0] : null;
	if (!customer) return [];

	let subscriptionCanceled: SubscriptionCanceled | undefined;
	return (await stripe.subscriptions.list({ customer: customer.id })).data
		.flatMap((subscription) => {
			subscriptionCanceled = {
				isCanceled: subscription.cancel_at_period_end,
				cancelAt: subscription.cancel_at
			};
			return subscription.items.data;
		})
		.map((item) => {
			return {
				canceled: subscriptionCanceled,
				priceId: item.price.id,
				productId: item.price.product as string,
				subscriptionId: item.subscription
			};
		});
}

export async function getProductWithPrices(): Promise<ProductWithPrices[]> {
	const prices = await getPricesWithProduct();
	const productsMap: Record<string, ProductWithPrices> = {};

	prices.forEach((price) => {
		const product = price.product as Stripe.Product;
		if (!product.active) return;
		if (!productsMap[product.id]) {
			productsMap[product.id] = {
				...product,
				prices: []
			};
		}

		productsMap[product.id].prices.push(price);
	});

	return Object.values(productsMap);
}

export async function getPriceByProductId(productId: string): Promise<Optional<Stripe.Price>> {
	const product = await stripe.products.retrieve(productId);
	if (!product.default_price) return null;
	const id = product.default_price;

	let priceId: string;
	if (typeof product.default_price === 'string') {
		priceId = product.default_price;
	} else if (product.default_price && typeof product.default_price === 'object') {
		priceId = product.default_price.id;
	} else {
		return null;
	}

	return getPrice(priceId);
}

export async function getPrice(priceId: string): Promise<Optional<Stripe.Price>> {
	if (priceId.startsWith('price_')) {
		return await stripe.prices.retrieve(priceId);
	}

	const { data } = await stripe.prices.list({
		limit: 1,
		active: true,
		lookup_keys: [priceId]
	});

	return data.length ? data[0] : null;
}

async function getCustomer(user: UserModel): Promise<Stripe.Customer> {
	const result = await stripe.customers.list({
		email: user.email
	});
	const customer = result.data.length ? result.data[0] : null;
	if (customer) return customer;

	return await stripe.customers.create({
		name: user.name,
		email: user.email,
		metadata: {
			user_id: user.idToken.sub
		}
	});
}

export async function updateSubscription(
	suscriptionId: string,
	cancelAtPeriodEnd: boolean
): Promise<Stripe.Subscription> {
	return await stripe.subscriptions.update(suscriptionId, {
		cancel_at_period_end: cancelAtPeriodEnd
	});
}

export async function createCheckout(
	url: URL,
	user: UserModel,
	price: Stripe.Price,
	quantity = 1
): Promise<Stripe.Checkout.Session> {
	const subscription_data = {
		metadata: { user_id: user.idToken.sub }
	};

	const recurring = price.type == 'recurring';

	return await stripe.checkout.sessions.create({
		success_url: `${url.origin}${relativeUrls.subscriptions.list}`,
		cancel_url: `${url.origin}${relativeUrls.subscriptions.list}`,
		mode: recurring ? 'subscription' : 'payment',
		customer_email: user.email,
		client_reference_id: user.idToken.sub,
		metadata: {
			user_id: user.idToken.sub,
			price_id: price.id,
			lookup_key: price.lookup_key
		},
		line_items: [{ price: price.id, quantity }],
		...(recurring ? { subscription_data } : {})
	});
}

export async function createPortalSession(
	url: URL,
	user: UserModel,
	flowData?: Stripe.BillingPortal.SessionCreateParams.FlowData
) {
	const customers = await stripe.customers.list({
		email: user.email
	});
	const customer = customers.data.length ? customers.data[0] : null;

	if (!customer) {
		throw new Error(`No customer found with email: ${user.email}`);
	}

	return await stripe.billingPortal.sessions.create({
		flow_data: flowData,
		customer: customer.id,
		return_url: `${url.origin}${relativeUrls.subscriptions.list}`
	});
}

async function syncSuscriptionData(user: UserModel) {
	//TODO Sync data with keycloak and the cache of the svelte server
}

export function toAbsoluteUrl(path: string | URL) {
	return new URL(path, env.DOMAIN).toString();
}
