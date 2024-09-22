import { type Optional } from './common/Optional.js';

import type { StripeSubscriptionStatus } from '@prisma/client'

// Guarantee that the implementation corresponds to the original type
export const subscriptionStatus: { [k in StripeSubscriptionStatus ]: k } = {
	INCOMPLETE: 'INCOMPLETE',
	INCOMPLETE_EXPIRED: 'INCOMPLETE_EXPIRED',
	TRIALING: 'TRIALING',
	ACTIVE: 'ACTIVE',
	PAST_DUE: 'PAST_DUE',
	CANCELED: 'CANCELED',
	UNPAID: 'UNPAID'
} as const

export type SubscriptionStatus = StripeSubscriptionStatus

export interface UserModel {
	userId: string;
	name: Optional<string>;
	image: Optional<string>;
	email: string;
	roles: string[];
}
