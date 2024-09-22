import type Stripe from "stripe";
import { prismaClient } from "./prisma_client.js";
import { stripe } from "../stripe/stripe_service.js";

export async function upsertCustomer(customer: Stripe.Customer | Stripe.DeletedCustomer, userId: string) {
  if ('deleted' in customer && customer.deleted) {
    await prismaClient.stripeCustomer.delete({
      where: { id: customer.id }
    });
    return;
  }
  const customerData = {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    currency: customer.currency,
    delinquent: customer.delinquent,
    invoicePrefix: customer.invoice_prefix,
    taxExempt: customer.tax_exempt,
    balance: customer.balance,
    description: customer.description,
    created: customer.created || Math.floor(Date.now() / 1000)
  };
  await prismaClient.stripeCustomer.upsert({
    where: { id: customer.id },
    update: {
      ...customerData
    },
    create: {
      id: customer.id,
      ...customerData,
      user: {
        connect: { id: userId }
      }
    }
  });
}
