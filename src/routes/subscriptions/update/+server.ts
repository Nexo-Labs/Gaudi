import { relativeUrls } from '$src/lib/domain/routing.js';
import { restrictAuth } from '$src/lib/server/auth.service.js';
import { updateSubscription } from '$src/lib/server/stripe/update_subscription.js';
import { error, redirect } from '@sveltejs/kit';

export const GET = async ({ locals, url }) => {
	await restrictAuth(locals);
	const subscriptionId = url.searchParams.get('subscriptionId');
	const cancelAtPeriodEnd = url.searchParams.get('cancelAtPeriodEnd') === 'true';
	if (!subscriptionId) throw error(406, 'subscriptionId could not be found.');
	await updateSubscription(subscriptionId, cancelAtPeriodEnd);
	redirect(303, relativeUrls.subscriptions.list);
};
