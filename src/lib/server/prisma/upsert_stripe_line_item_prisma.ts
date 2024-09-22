import type Stripe from "stripe";
import { prismaClient } from "./prisma_client.js";

export async function upsertLineItem(lineItem: Stripe.LineItem, checkoutId: string) {
  const product = lineItem.price?.product as Stripe.Product | undefined;
  const lineItemData = {
    ammountDiscount: lineItem.amount_discount,
    ammountSubtotal: lineItem.amount_subtotal,
    ammountTotal: lineItem.amount_total,
    ammountTax: lineItem.amount_tax,
    currency: lineItem.currency,
    description: lineItem.description,
    price_active: lineItem.price?.active,
    price_billingScheme: lineItem.price?.billing_scheme,
    price_created: lineItem.price?.created,
    price_id: lineItem.price?.id,
    price_liveMode: lineItem.price?.livemode,
    price_lookupKey: lineItem.price?.lookup_key,
  }
  await prismaClient.stripeLineItem.upsert({
    where: { id: lineItem.id },
    update: {
      ...lineItemData,
      product: {
        connect: { id: product?.id }
      },
      checkoutSession: {
        connect: { id: checkoutId }
      }
    },
    create: {
      id: lineItem.id,
      ...lineItemData,
      product: {
        connect: { id: product?.id }
      },
      checkoutSession: {
        connect: { id: checkoutId }
      }
    }
  });
}
