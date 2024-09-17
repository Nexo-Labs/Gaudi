import { error, json } from '@sveltejs/kit';
import type Stripe from 'stripe';
import { env } from '$env/dynamic/private';
import { stripe } from '$src/lib/server/stripe_service.js';

export const POST = async ({ request }) => {
	const whSecret = env.STRIPE_WEBHOOK_SECRET;
	const body = await request.text();

	const signature = request.headers.get('stripe-signature') ?? '';

	try {
		const event = stripe.webhooks.constructEvent(body, signature, whSecret);

		if (event.type === 'customer.subscription.updated') {
			const sessionWithCustomer = await stripe.checkout.sessions.retrieve(event.data.object.id, {
				expand: ['customer']
			});

			const customer = sessionWithCustomer.customer as Stripe.Customer;
		}
	} catch (err) {
		console.log('Something went wrong.', err);
		error(500);
	}

	return json({ success: true });
};
