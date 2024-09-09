import Stripe from 'stripe'
import { env } from '$env/dynamic/private'

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20'
})

export async function getProducts(): Promise<Stripe.Product[]> {
    return (await stripe.products.list({
      active: true,
      expand: ['data.default_price']
    })).data
}