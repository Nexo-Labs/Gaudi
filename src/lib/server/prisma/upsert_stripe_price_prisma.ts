import type Stripe from "stripe";
import { prismaClient } from "./prisma_client.js";
import { upsertProduct } from "./upsert_stripe_product_prisma.js";

export async function upsertPrice(price: Stripe.Price) {
  if (price.deleted) {
    prismaClient.stripePrice.del(price.id);
    return;
  }

  await upsertProduct(price.product)
  const productId = typeof price.product === 'string' ? price.product : price.product.id;
  
  const priceData = {
    active: price.active,
    metadata: price.metadata,
    recurring: price.recurring,
    unitAmount: price.unit_amount,
    unitAmountDecimal: price.unit_amount_decimal,
    currency: price.currency,
    nickname: price.nickname,
    type: price.type,
    currencyOptions: price.currency_options,
    taxBehavior: price.tax_behavior,
    tiers: price.tiers,
    tiersMode: price.tiers_mode,
    transformQuantity: price.transform_quantity,
    billingScheme: price.billing_scheme,
    created: price.created,
    liveMode: price.livemode,
    lookupKey: price.lookup_key,
    product: { connect: { id: productId } }
  };

  await prismaClient.stripePrice.upsert({
    where: { id: price.id },
    update: priceData,
    create: {
      id: price.id,
      ...priceData,
    }
  });
}
