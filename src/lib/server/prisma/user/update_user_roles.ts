import type { Prisma } from "@prisma/client";
import { prismaClient } from "../prisma_client.js";

export type UserWithStripeCustomers = Prisma.UserGetPayload<{}>;

export async function updateUserRoles(email: string, roles: string[]) {
    try {
      await prismaClient.user.update({
        where: {
          email,
        },
        data: {
          roles: {
            set: roles
          }
        }
      });
    } catch(e) {
      console.warn("First time user sign in, no user found to update roles");
    }
}