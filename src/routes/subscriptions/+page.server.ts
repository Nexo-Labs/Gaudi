import { getUser } from '$src/lib/server/auth.service.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { stripeProductTypes } from '$src/lib/domain/prisma-enum-mapping.js';
import { getSubscriptionsByUser } from '$src/lib/server/prisma/subscriptions/get_subscriptions_by_user.js';
import { getActiveProducts } from '$src/lib/server/prisma/product/get_active_products.js';

export const load: PageServerLoad = async ({ locals }) => {
	const user = await getUser(locals);
	if (!user) return redirect(303, '/');

	return {
		currentSubscriptions: await getSubscriptionsByUser(user),
		products: await getActiveProducts(stripeProductTypes.service)
	};
};
