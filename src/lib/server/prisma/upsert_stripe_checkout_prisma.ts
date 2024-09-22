import type Stripe from "stripe";
import { prismaClient } from "./prisma_client.js";
import { error } from "@sveltejs/kit";

export async function upsertStripeCheckout(checkout: Stripe.Checkout.Session): Promise<void> {
  const customerId = checkout.customer as string;
  if (!customerId) {
    error(404, `Missing customer id for checkout '${checkout.id}'`);
  }

  const checkoutSessionData = {
    unitAmount: checkout.amount_subtotal,
    totalAmount: checkout.amount_total,
    currency: checkout.currency,
    allowPromotionCodes: checkout.allow_promotion_codes,
    clientReferenceId: checkout.client_reference_id,
    clientSecret: checkout.client_secret,
    consent: checkout.consent ? JSON.stringify(checkout.consent) : null,
    consentCollection: checkout.consent_collection ? JSON.stringify(checkout.consent_collection) : null,
    expiresAt: checkout.expires_at ,
    invoiceId: checkout.invoice ? (checkout.invoice as string) : null,
    invoiceCreation: checkout.invoice_creation ? JSON.stringify(checkout.invoice_creation) : null,
    locale: checkout.locale,
    mode: checkout.mode,
    paymentIntentId: checkout.payment_intent ? (checkout.payment_intent as string) : null,
    paymentStatus: checkout.payment_status,
    recoveredFrom: checkout.recovered_from,
    subscriptionId: checkout.subscription ? (checkout.subscription as string) : null,
    successUrl: checkout.success_url,
    cancelUrl: checkout.cancel_url,
    status: checkout.status,
    url: checkout.url,
    livemode: checkout.livemode,
    shippingAddressCollection: checkout.shipping_address_collection ? JSON.stringify(checkout.shipping_address_collection) : null,
    shippingDetails: checkout.shipping_details ? JSON.stringify(checkout.shipping_details) : null,
  };

  await prismaClient.stripeCheckoutSession.upsert({
    where: { id: checkout.id },
    update: {
      ...checkoutSessionData,
    },
    create: {
      id: checkout.id,
      created: checkout.created,
      ...checkoutSessionData,
      customer: {
        connect: { id: customerId }
      }
    }
  });
}
