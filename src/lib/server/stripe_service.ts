import Stripe from 'stripe'
import { env } from '$env/dynamic/private'
import type { Optional } from '../domain/common/Optional.js'
import type { UserModel } from '../domain/user-model.js'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20'
})

export async function getProducts(): Promise<Stripe.Product[]> {
    return (await stripe.products.list({
      active: true,
      expand: ['data.default_price']
    })).data
}

export async function getPriceByProductId(productId: string): Promise<Optional<Stripe.Price>> {
  const product = await stripe.products.retrieve(productId);
  if (!product.default_price) return null;
  const id = product.default_price
  
  let priceId: string;
  if (typeof product.default_price === 'string') {
    priceId = product.default_price;
  } else if (product.default_price && typeof product.default_price === 'object') {
    priceId = product.default_price.id;
  } else {
    return null;
  }

  return getPrice(priceId)
}

export async function getPrice(priceId: string): Promise<Optional<Stripe.Price>> {
  if (priceId.startsWith('price_')) {
    return (await stripe.prices.retrieve(priceId));
  }
  
  const { data } = await stripe.prices.list({
    limit: 1,
    active: true,
    lookup_keys: [priceId],
  })

  return data.length ? data[0] : null
}

export async function createSubscription(user: UserModel, price: Stripe.Price) {
  const customer = await stripe.customers.create({
    name: user.name,
    email: user.email,
    metadata: {
      userId: user.idToken.sub
    }
  })

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: price.id }],
    metadata: {
      userId: user.idToken.sub
    }
  })

  await syncSuscriptionData(user)
}

export async function createCheckout(user: UserModel, price: Stripe.Price) {
  const customer = await stripe.customers.create({
    name: user.name,
    email: user.email,
  })

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: price.id }]
  })

  await syncSuscriptionData(user)
}



export async function createPortalSession(user: UserModel) {
  const customers = await stripe.customers.list({
    email: user.email,
  });
  const customer = customers.data.length ? customers.data[0] : null;

  if (!customer) {
    throw new Error(`No customer found with email: ${user.email}`);
  }

  return stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: absoluteURL("/suscriptions/list")
  })
}

async function syncSuscriptionData(user: UserModel) {
  //TODO Sync data with keycloak and the cache of the svelte server
}



function absoluteURL(path: string | URL) {
  return new URL(path, env.DOMAIN).toString()
}