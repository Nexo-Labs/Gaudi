import { stripe } from "$src/lib/server/stripe.js"
import type { PageServerLoad } from './$types.js';


export const load : PageServerLoad = async () => {
  const { data } = await stripe.products.list({
    active: true,
    expand: ['data.default_price']
  })

  return {
    products: data
  }
}