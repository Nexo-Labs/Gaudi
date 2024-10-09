import { stripe } from "../stripe_service.js"
import { error } from "@sveltejs/kit"
import { upsertSubscription } from "../../prisma/subscriptions/upsert_stripe_subscription_prisma.js"
import { prismaClient } from "../../prisma/prisma_client.js"
import { getActiveSubscriptionsByUser } from "../../prisma/subscriptions/get_active_subscriptions_by_user.js";
import { updateSubscritionsAtUser } from "../../prisma/subscriptions/update_subscritions_at_user.js";

export async function syncSubscription(subscriptionId: string) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, { expand: ['items.data.price.product', 'customer'] })
    const user = await prismaClient.user.findFirst({ where: { id: subscription.metadata.user_id } })

    if (!user) error(404, `Missing user metadata for subscription '${subscription.id}'`)

    await upsertSubscription(subscription)
    await updateSubscritionsAtUser(user.id, 
        (await getActiveSubscriptionsByUser(user.id)).map((subscription) => subscription.price.productId)
    );
}
