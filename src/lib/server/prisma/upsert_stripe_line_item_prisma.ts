import type Stripe from "stripe";
import { prismaClient } from "./prisma_client.js";
import { notNullAsync } from "$src/lib/domain/common/optional_helpers.js";

export async function upsertLineItem(lineItem: Stripe.LineItem, checkoutId: string) {
  const product = lineItem.price?.product as Stripe.Product | undefined;
  const lineItemData = {
    ammountDiscount: lineItem.amount_discount,
    ammountSubtotal: lineItem.amount_subtotal,
    ammountTotal: lineItem.amount_total,
    ammountTax: lineItem.amount_tax,
    currency: lineItem.currency,
    description: lineItem.description,
  }

  await notNullAsync(lineItem.price, price => upsertPrice(price))

  await prismaClient.stripeLineItem.upsert({
    where: { id: lineItem.id },
    update: {
      ...lineItemData,
      product: {
        connect: { id: product?.id }
      },
      price: {
        connect: { id: lineItem.price?.id }
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
      price: {
        connect: { id: lineItem.price?.id }
      },
      checkoutSession: {
        connect: { id: checkoutId }
      }
    }
  });
}

export async function upsertPrice(price: Stripe.Price) {
  const priceData = {
    active: price.active,
    billingScheme: price.billing_scheme,
    created: price.created,
    liveMode: price.livemode,
    lookupKey: price.lookup_key,
  }

  await prismaClient.stripePrice.upsert({
    where: { id: price.id },
    update: {
      ...priceData,
    },
    create: {
      id: price.id,
      ...priceData,
    }
  });
  
}