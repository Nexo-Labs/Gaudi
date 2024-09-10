import Stripe from 'stripe'
import { env } from '$env/dynamic/private'
import type { Optional } from '../domain/common/Optional.js'
import type { UserModel } from '../domain/user-model.js'
import { relativeUrls, toAbsoluteUrl } from './routing.js'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20'
})

async function getPrices(): Promise<Stripe.Price[]> {
  return (await stripe.prices.list({
    expand: ['data.product']
  })).data
}

type ProductWithPrices = Stripe.Product & {
  prices: Stripe.Price[];
};

export async function getProductWithPrices(): Promise<ProductWithPrices[]> {

  const prices = await getPrices();
  const productsMap: Record<string, ProductWithPrices> = {};

  prices.forEach((price) => {
    const product = price.product as Stripe.Product;
    if (!product.active) return
    if (!productsMap[product.id]) {
      productsMap[product.id] = {
        ...product,
        prices: []
      };
    }

    productsMap[product.id].prices.push(price);
  });


  return Object.values(productsMap);

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

export async function createCheckout(url: URL, user: UserModel, price: Stripe.Price, quantity = 1): Promise<Stripe.Checkout.Session> {

  const subscription_data = {
    metadata: { userId: user.idToken.sub }
  }

  const recurring = price.type == 'recurring'

  return await stripe.checkout.sessions.create({
      success_url: `${url.origin}${relativeUrls.subscriptions.checkoutComplete}`,
      cancel_url: `${url.origin}${relativeUrls.subscriptions.checkoutCancel}`,
      mode: recurring ? 'subscription' : 'payment',
      customer_email: user.email,
      client_reference_id: user.idToken.sub,
      metadata: {
        userId: user.idToken.sub,
        priceId: price.id,
        lookupKey: price.lookup_key   
      },
      line_items: [{price: price.id, quantity}],
      ...(recurring ? { subscription_data } : {})
    }
  )
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
    return_url: toAbsoluteUrl(relativeUrls.subscriptions.list)
  })
}

async function syncSuscriptionData(user: UserModel) {
  //TODO Sync data with keycloak and the cache of the svelte server
}



