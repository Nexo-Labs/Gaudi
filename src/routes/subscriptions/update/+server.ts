import { relativeUrls } from '$src/lib/domain/routing.js';
import { restrictAuth } from '$src/lib/server/auth.service.js';
import { updateSubscriptionCanceledAtPeriodEnd } from '$src/lib/server/prisma/subscriptions/update_subscription_canceled_at_period_end.js';
import { updateSubscription } from '$src/lib/server/stripe/subscriptions/update_subscription.js';
import { error, redirect } from '@sveltejs/kit';

export const GET = async ({ locals, url }) => {
	await restrictAuth(locals);
	const subscriptionId = url.searchParams.get('subscriptionId');
	const cancelAtPeriodEnd = url.searchParams.get('cancelAtPeriodEnd') === 'true';
	if (!subscriptionId) throw error(406, 'subscriptionId could not be found.');
	await updateSubscription(subscriptionId, cancelAtPeriodEnd);
	await updateSubscriptionCanceledAtPeriodEnd(subscriptionId, cancelAtPeriodEnd);
	redirect(303, relativeUrls.subscriptions.list);
};


