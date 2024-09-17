import { relativeUrls } from "$src/lib/domain/routing.js";
import type { UserModel } from "$src/lib/domain/user-model.js";
import type Stripe from "stripe";
import { stripe } from "./stripe_service.js";

export async function createCheckout(
	url: URL,
	user: UserModel,
	price: Stripe.Price,
	quantity = 1
): Promise<Stripe.Checkout.Session> {
	const subscription_data = {
		metadata: { user_id: user.userId }
	};

	const recurring = price.type == 'recurring';

	return await stripe.checkout.sessions.create({
		success_url: `${url.origin}${relativeUrls.subscriptions.list}`,
		cancel_url: `${url.origin}${relativeUrls.subscriptions.list}`,
		mode: recurring ? 'subscription' : 'payment',
		customer_email: user.email,
		client_reference_id: user.userId,
		metadata: {
			user_id: user.userId,
			price_id: price.id,
			lookup_key: price.lookup_key
		},
		line_items: [{ price: price.id, quantity }],
		...(recurring ? { subscription_data } : {})
	});
}
