import type { StripeSubscriptionStatus, StripeProductType } from "@prisma/client";

export const subscriptionStatus: {
	[k in StripeSubscriptionStatus]: k;
} = {
	INCOMPLETE: 'INCOMPLETE',
	INCOMPLETE_EXPIRED: 'INCOMPLETE_EXPIRED',
	TRIALING: 'TRIALING',
	ACTIVE: 'ACTIVE',
	PAST_DUE: 'PAST_DUE',
	CANCELED: 'CANCELED',
	UNPAID: 'UNPAID'
} as const;

export type SubscriptionStatus = StripeSubscriptionStatus;

export const stripeProductTypes: {
	[k in StripeProductType]: k;
} = {
	service: 'service',
	good: 'good'
} as const;

export type ProductType = StripeProductType;
