import type Stripe from "stripe";
import { prismaClient } from "./prisma_client.js";
import { upsertSubscriptionItem } from "./upsert_stripe_subscription_item_prisma.js";
import { upsertCustomer } from "./upsert_stripe_customer_prisma.js";
import { subscriptionStatus } from '$src/lib/domain/prisma-enum-mapping.js';

export async function upsertSubscription(subscription: Stripe.Subscription): Promise<void> {
    const customer = subscription.customer as Stripe.Customer
    await upsertCustomer(customer, subscription.metadata.user_id)
    const statusKey = subscription.status.toUpperCase() as keyof typeof subscriptionStatus;

    const subscriptionData = {
        startDate: subscription.start_date,
        endedAt: subscription.ended_at,
        currentPeriodEnd: subscription.current_period_end,
        currentPeriodStart: subscription.current_period_start,
        canceledAt: subscription.canceled_at,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        invoiceId: subscription.latest_invoice,
        description: subscription.description,
        trialStart: subscription.trial_start,
        trialEnd: subscription.trial_end,
        currency: subscription.currency,
        status: subscriptionStatus[statusKey],
        discounts: subscription.discounts,
        discount: subscription.discount,
        customer: { connect: { id: customer.id } },
    }
    
    await prismaClient.stripeSubscription.upsert({
      where: { id: subscription.id },
      update: subscriptionData,
      create: {
        id: subscription.id,
        ...subscriptionData,
      }
    });

    await Promise.all(
        subscription.items.data
          .mapNotNull((item) => item)
          .map((item) => upsertSubscriptionItem(item)
        )
    );
  }
  
  