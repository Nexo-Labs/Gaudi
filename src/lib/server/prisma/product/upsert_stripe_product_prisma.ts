import type Stripe from "stripe";
import { prismaClient } from "../prisma_client.js";
import { stripe } from "../../stripe/stripe_service.js";

export async function upsertProduct(product: Stripe.Product | Stripe.DeletedProduct | string) {
  if (typeof product === 'string') {
    product = await stripe.products.retrieve(product);
    console.warn(`Product ${product.id} not found in stripe request, please fix it`);
  }
  if ('deleted' in product && product.deleted) {
    await stripe.products.del(product.id);
    return;
  }

  const productData = {
    active: product.active,
    name: product.name,
    description: product.description,
    taxCode: product.tax_code,
    unitLabel: product.unit_label,
    type: product.type,
    created: product.created,
    updated: product.updated,
    url: product.url,
    images: product.images,
    metadata: product.metadata ?? {},
    livemode: product.livemode,
    marketingFeatures: product.metadata.marketing_features,
    packageDimensions: product.package_dimensions,
    shippable: product.shippable,
    statementDescriptor: product.statement_descriptor
  };

  await prismaClient.stripeProduct.upsert({
    where: { id: product.id },
    update: productData,
    create: {
      id: product.id,
      ...productData
    }
  });
}