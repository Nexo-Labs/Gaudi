import type Stripe from "stripe";
import { prismaClient } from "./prisma_client.js";
import { upsertProduct } from "./upsert_stripe_product_prisma.js";


export async function upsertPrice(price: Stripe.Price) {
  if (price.deleted) {
    prismaClient.del(price.id);
  }
  const product = price.product as Stripe.Product;
  await upsertProduct(product)
  
  const priceData = {
    active: price.active,
    billingScheme: price.billing_scheme,
    created: price.created,
    liveMode: price.livemode,
    lookupKey: price.lookup_key,
    product: { connect: { id: product?.id } }
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
