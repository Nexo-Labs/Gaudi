import { getUser } from '$src/lib/server/auth.service.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { stripeProductTypes } from '$src/lib/domain/prisma-enum-mapping.js';
import { getSubscriptionsByUser } from '$src/lib/server/prisma/subscriptions/get_subscriptions_by_user.js';
import { getActiveProducts, type ActiveProduct } from '$src/lib/server/prisma/product/get_active_products.js';
interface ProductsByInterval {
	[interval: string]: ActiveProduct[];
  }
  
export const load: PageServerLoad = async ({ locals }) => {
	const user = await getUser(locals);
	if (!user) return redirect(303, '/');
	const allProducts = await getActiveProducts(stripeProductTypes.service)
	const productsByInterval: ProductsByInterval = allProducts.reduce((acc: ProductsByInterval, product: ActiveProduct) => {
		product.prices.forEach((price) => {
		  const interval = price.recurring?.interval;
	
		  if (interval) {
			if (!acc[interval]) {
			  acc[interval] = [];
			}
	
			acc[interval].push({
			  ...product,
			  prices: product.prices.filter(p => p.recurring?.interval === interval),
			});
		  }
		});
	
		return acc;
	  }, {});
		
	
	return {
		currentSubscriptions: await getSubscriptionsByUser(user),
		productsByInterval
	};
};
