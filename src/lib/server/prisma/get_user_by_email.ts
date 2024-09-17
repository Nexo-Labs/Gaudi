import type { Prisma } from "@prisma/client";
import { prismaClient } from "./prisma_client.js";

export type UserWithStripeCustomers = Prisma.UserGetPayload<{
    include: { stripeCustomers: true };
}>;

export async function getUserWithStripeCustomersByEmail(email: string): Promise<UserWithStripeCustomers | null> {
    return await prismaClient.user.findUnique({
      where: {
        email,
      },
      include: {
        stripeCustomers: true,
      },
    });
}