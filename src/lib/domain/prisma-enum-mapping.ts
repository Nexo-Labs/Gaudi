import type { StripeSubscriptionStatus, StripeProductTypeType, ContentCMSType as PrismaContentCMSType  } from "@prisma/client";

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
	[k in StripeProductTypeType]: k;
} = {
	service: 'service',
	good: 'good'
} as const;

export type ProductType = StripeProductTypeType;

export const contentCMSTypes: {
	[k in PrismaContentCMSType]: k;
} = {
	ARTICLE: 'ARTICLE',
	VIDEO: 'VIDEO',
	BOOK: 'BOOK',
	PHOTO: 'PHOTO',
	QUOTE: 'QUOTE',
} as const;

export type ContentCMSType = PrismaContentCMSType;
