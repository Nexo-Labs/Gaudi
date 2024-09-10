import { getProductWithPrices } from "$src/lib/server/stripe_service.js"
import type { PageServerLoad } from './$types.js';
import Stripe from 'stripe'

export const load : PageServerLoad = async () => {
  return {
    products: await getProductWithPrices()
  };
}