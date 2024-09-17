import type Stripe from "stripe";
import { stripe } from "./stripe_service.js";

export async function updateSubscription(
	suscriptionId: string,
	cancelAtPeriodEnd: boolean
): Promise<Stripe.Subscription> {
	return await stripe.subscriptions.update(suscriptionId, {
		cancel_at_period_end: cancelAtPeriodEnd
	});
}
