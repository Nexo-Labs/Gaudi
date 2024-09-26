import { prismaClient } from "$src/lib/server/prisma/prisma_client.js";

export async function updateSubscriptionCanceledAtPeriodEnd(subscriptionId: string, cancelAtPeriodEnd: boolean) {
	await prismaClient.stripeSubscription.update({
		where: { id: subscriptionId },
		data: { cancelAtPeriodEnd: cancelAtPeriodEnd }
	});
}
