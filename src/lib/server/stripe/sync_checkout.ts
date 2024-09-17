import type { JsonValue } from "@prisma/client/runtime/library"
import { prismaClient } from "../prisma/prisma_client.js"
import { stripe } from "./stripe_service.js"
import { syncSubscription } from "./sync_subscription.js"

export async function syncCheckout(sessionId: string) {
  const checkout = await stripe.checkout.sessions.retrieve(sessionId)
  const { metadata } = checkout
  const { userId, productId, priceId, lookupKey } = metadata

  if (!userId) throw new Error(`Missing user id metadata for checkout '${sessionId}'`)

  const user = await prismaClient.user.findFirst({ where: { id: userId } })
  const purchase = { productId, priceId, lookupKey, paymentIntent: checkout.payment_intent }

  if (!user) throw new Error(`User not found for checkout '${sessionId}'`)

  if (!hasPurchase(user, checkout.payment_intent)) {

    await prismaClient.user.update({
      where: { id: userId },
      data: {
        customerId: { set: checkout.customer as string },
        purchases: { set: [...user.purchases, purchase] }
      }
    });

  }

  if (checkout.mode == 'subscription') {
    return syncSubscription(checkout.subscription as string)
  }
}


function hasPurchase(user: { purchases: [JsonValue] }, paymentIntent: string) {
  return user.purchases.find((purchase) => purchase.paymentIntent == paymentIntent)
}
