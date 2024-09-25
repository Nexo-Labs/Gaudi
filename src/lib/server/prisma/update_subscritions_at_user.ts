import { prismaClient } from "./prisma_client.js";

export async function updateSubscritionsAtUser(userId: string, subscriptions: string[]) {
    await prismaClient.user.update({
        where: { id: userId },
        data: {
            stripeRoles: subscriptions,
        },
    });
}
