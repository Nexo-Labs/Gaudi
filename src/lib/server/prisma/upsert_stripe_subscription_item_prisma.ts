import type Stripe from "stripe";
import { upsertPrice } from "./upsert_stripe_price_prisma.js";
import { prismaClient } from "./prisma_client.js";

export async function upsertSubscriptionItem(item: Stripe.SubscriptionItem): Promise<void> {
    const lineItemData = {
        quantity: item.quantity,
        created: item.created,
        discounts: item.discounts ?? [],
        subscription: { connect: { id: item.subscription } },
        price: { connect: { id: item.price?.id } },
    }

    await upsertPrice(item.price)

    await prismaClient.stripeSubscriptionItem.upsert({
        where: { id: item.id },
        update: lineItemData,
        create: {
            id: item.id,
            ...lineItemData,
        }
    });
}

