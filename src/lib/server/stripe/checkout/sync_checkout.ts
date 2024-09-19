import type { JsonArray, JsonObject, JsonValue } from "@prisma/client/runtime/library"
import { prismaClient } from "../../prisma/prisma_client.js"
import { stripe } from "../stripe_service.js"
import { syncSubscription } from "../subscriptions/sync_subscription.js"
import type Stripe from "stripe"

export async function syncCheckout(checkout: Stripe.Checkout.Session) {
  const id = checkout.id
  const userId = checkout.client_reference_id
  const amountSubtotal = checkout.amount_subtotal
  const amountTotal = checkout.amount_total
  const subscription = checkout.subscription
  const paymentStatus = checkout.payment_status
  const mode = checkout.mode
  const invoice = checkout.invoice
  const currency = checkout.currency
  const paymentIntent = checkout.payment_intent as string
  const customer = checkout.customer
  
  if (!userId) throw new Error(`Missing user id metadata for checkout '${checkout.id}'`)

  const user = await prismaClient.user.findFirst({ where: { id: userId } })

  const { data: lineItems } = await stripe.checkout.sessions.listLineItems(checkout.id, { expand: ['data.price.product'] })
  
  if (!user) throw new Error(`User not found for checkout '${checkout.id}'`)

  if (checkout.mode == 'subscription') {
    return syncSubscription(checkout.subscription as string)
  }
}


