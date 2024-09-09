import { getProducts } from "$src/lib/server/stripe_service.js"
import type { PageServerLoad } from './$types.js';


export const load : PageServerLoad = async () => {

  return {
    products: await getProducts()
  }
}