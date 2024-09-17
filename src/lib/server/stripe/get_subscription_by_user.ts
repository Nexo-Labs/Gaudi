import type { UserModel } from "$src/lib/domain/user-model.js";
import { stripe } from "./stripe_service.js";

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
		}
	);
}
