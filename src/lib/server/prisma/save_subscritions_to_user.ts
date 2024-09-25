import { prismaClient } from "./prisma_client.js";

export async function saveSubscritionsToUser(userId: string, subscriptions: { price: { productId: string; }; }[]) {
    await prismaClient.user.update({
        where: { id: userId },
        data: {
            stripeRoles: subscriptions,
        },
    });
}
