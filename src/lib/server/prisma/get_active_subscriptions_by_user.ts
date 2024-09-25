import type { Prisma } from "@prisma/client";
import { prismaClient } from "./prisma_client.js";

export type ActiveProductIdsByUser = Prisma.StripeSubscriptionItemGetPayload<{
    select: {
        price: {
            select: {
                productId: true;
            };
        };
    };
}>;

export async function getActiveSubscriptionsByUser(userId: string): Promise<ActiveProductIdsByUser[]> {
    return await prismaClient.stripeSubscriptionItem.findMany({
        where: {
            subscription: {
                status: 'ACTIVE',
                customer: {
                    userId
                },
            },
        },
        select: {
            price: {
                select: {
                    productId: true,
                },
            },
        },
    });
}
