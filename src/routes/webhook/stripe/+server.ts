import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { stripe } from '$src/lib/server/stripe/stripe_service.js';
import { syncCheckout } from '$src/lib/server/stripe/checkout/sync_checkout.js';
import { syncSubscription } from '$src/lib/server/stripe/subscriptions/sync_subscription.js';

export const POST = async ({ request }) => {
	const whSecret = env.STRIPE_WEBHOOK_SECRET;
	const body = await request.text();

	const signature = request.headers.get('stripe-signature') ?? '';

	try {
		const event = stripe.webhooks.constructEvent(body, signature, whSecret);

		switch (event.type) {
			case 'checkout.session.completed':
				await syncCheckout(event.data.object)
				break
			case 'customer.subscription.created':
			case 'customer.subscription.updated':
			case 'customer.subscription.deleted':
			case 'customer.subscription.trial_will_end':
			case 'customer.subscription.paused':
				await syncSubscription(event.data.object.id)
				break
		}
	} catch (err) {
		console.log('Something went wrong.', err);
		error(500);
	}

	return json({ success: true });
};
