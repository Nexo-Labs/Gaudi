import type { Prisma } from "@prisma/client";
import { prismaClient } from "../prisma_client.js";
import type { ProductType } from "$src/lib/domain/prisma-enum-mapping.js";
import type { Stripe } from "stripe";

type StripePriceWithTypedJson = Omit<
  Prisma.StripePriceGetPayload<{}>,
  'recurring' | 'currencyOptions' | 'tiers' | 'tiersMode' | 'transformQuantity' | 'metadata'
> & {
  recurring: Stripe.Price.Recurring | null;
  currencyOptions: { [key: string]: Stripe.Price.CurrencyOptions } | null;
  tiers: Stripe.Price.Tier[] | null;
  tiersMode: Stripe.Price.TiersMode | null;
  transformQuantity: Stripe.Price.TransformQuantity | null;
  metadata: Stripe.Metadata;
};

type ActiveProduct = Omit<
  Prisma.StripeProductGetPayload<{
    include: {
      prices: true;
    };
  }>,
  'prices'
> & {
  prices: StripePriceWithTypedJson[];
};

export async function getActiveProducts(type?: ProductType): Promise<ActiveProduct[]> {
    return await prismaClient.stripeProduct.findMany({
        where: {
            type,
            active: true
        },
        include: {
            prices: {
                where: {
                    active: true
                }
            }
        }
    });
}
