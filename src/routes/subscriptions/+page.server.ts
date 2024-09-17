import { getUser } from '$src/lib/server/auth.service.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { getSubscriptionsByUser } from '$src/lib/server/stripe/get_subscription_by_user.js';
import { getProductWithPrices } from '$src/lib/server/stripe/getProductWithPrices.js';

export const load: PageServerLoad = async ({ locals }) => {
	const user = await getUser(locals);
	if (!user) return redirect(303, '/');
	const currentSubscriptions = await getSubscriptionsByUser(user);

	return {
		currentSubscriptions,
		products: await getProductWithPrices()
	};
};
