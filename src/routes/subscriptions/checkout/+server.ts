import { error, redirect } from '@sveltejs/kit';
import { restrictAuth } from '$src/lib/server/auth.service.js';
import { createSubscriptionCheckout } from '$src/lib/server/stripe/checkout/create_checkout.js';

const expiredStates = ['INCOMPLETE_EXPIRED', 'CANCELED'];

export const GET = async ({ locals, url }) => {
	const user = await restrictAuth(locals);
	const priceId = url.searchParams.get('priceId');

	if (!priceId) throw error(406, 'Price could not be found.');

	const checkoutResult = await createSubscriptionCheckout(url, user, priceId);
	if (checkoutResult.url) return redirect(303, checkoutResult.url);
	else throw error(406, 'Create checkout url failed');
};
