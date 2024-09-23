import { prismaClient } from "../../prisma/prisma_client.js"
import { stripe } from "../stripe_service.js"
import { syncSubscription } from "../subscriptions/sync_subscription.js"
import type Stripe from "stripe"
import { error } from "@sveltejs/kit"
import { upsertCustomer } from "../../prisma/upsert_stripe_customer_prisma.js"
import { upsertProduct } from "../../prisma/upsert_stripe_product_prisma.js"
import { upsertLineItem } from "../../prisma/upsert_stripe_line_item_prisma.js"
import { upsertStripeCheckout } from "../../prisma/upsert_stripe_checkout_prisma.js"

export async function syncCheckout(checkout: Stripe.Checkout.Session) {
  const userId = checkout.client_reference_id
  const customerId = checkout.customer as string

  if (!userId) error(404, `Missing user id metadata for checkout '${checkout.id}'`)

  const [user, customer, lineItems] = await Promise.all([
    prismaClient.user.findFirst({ where: { id: userId } }),
    stripe.customers.retrieve(customerId),
    stripe.checkout.sessions.listLineItems(checkout.id, { expand: ['data.price.product'] })
  ]);

  if (!user) error(404, `Missing user id metadata for checkout '${checkout.id}'`)
  if (!customer) error(404, `Missing customer at stripe for '${checkout.id}'`)

  await upsertCustomer(customer, userId);
  await upsertStripeCheckout(checkout);
  await Promise.all(lineItems.data.mapNotNull((lineItem) => upsertLineItem(lineItem, checkout.id)));

  if (checkout.mode == 'subscription') {
    return syncSubscription(checkout.subscription as string)
  }
}

