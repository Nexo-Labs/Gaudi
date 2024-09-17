import { SubscriptionStatus } from "@prisma/client"
import { prismaClient } from "../prisma/prisma_client.js"
import { stripe } from "./stripe_service.js"

export async function syncSubscription(subscriptionId: string) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const { userId } = subscription.metadata

    if (!userId) throw new Error(`Missing user id metadata for subscription '${subscriptionId}'`)

    const item = subscription.items.data[0]
    const { price } = item
    try {
        const statusKey = subscription.status.toUpperCase() as keyof typeof SubscriptionStatus;

        await prismaClient.user.update({
            where: {
                id: userId,
            },
            data: {
                customerId: { set: subscription.customer as string },
                subscriptionId: { set: subscription.id },
                subscriptionStatus: { set: SubscriptionStatus[statusKey] },
                plan: { set: price.lookup_key },
                priceId: { set: price.id },
            }
        });
    } catch (e) {
        console.warn("First time user sign in, no user found to update roles");
    }
}

