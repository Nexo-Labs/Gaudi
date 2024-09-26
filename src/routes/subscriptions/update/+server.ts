import { relativeUrls } from '$src/lib/domain/routing.js';
import { restrictAuth } from '$src/lib/server/auth.service.js';
import { updateSubscription } from '$src/lib/server/stripe/subscriptions/update_subscription.js';
import { error, redirect } from '@sveltejs/kit';
import { updateSubscriptionCanceledAtPeriodEnd } from '$lib/server/prisma/update_subscription_canceled_at_period_end.js';

export const GET = async ({ locals, url }) => {
	await restrictAuth(locals);
	const subscriptionId = url.searchParams.get('subscriptionId');
	const cancelAtPeriodEnd = url.searchParams.get('cancelAtPeriodEnd') === 'true';
	if (!subscriptionId) throw error(406, 'subscriptionId could not be found.');
	await updateSubscription(subscriptionId, cancelAtPeriodEnd);
	await updateSubscriptionCanceledAtPeriodEnd(subscriptionId, cancelAtPeriodEnd);
	redirect(303, relativeUrls.subscriptions.list);
};


