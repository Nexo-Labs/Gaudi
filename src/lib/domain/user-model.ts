import { jwtDecode } from 'jwt-decode';
import type { Session } from '@auth/sveltekit';
import { flatMap, type Optional } from './common/Optional.js';

import type { SubscriptionStatus as SubscriptionStatusOrigin } from '@prisma/client'

// Guarantee that the implementation corresponds to the original type
export const subscriptionStatus: { [k in SubscriptionStatusOrigin ]: k } = {
	INCOMPLETE: 'INCOMPLETE',
	INCOMPLETE_EXPIRED: 'INCOMPLETE_EXPIRED',
	TRIALING: 'TRIALING',
	ACTIVE: 'ACTIVE',
	PAST_DUE: 'PAST_DUE',
	CANCELED: 'CANCELED',
	UNPAID: 'UNPAID'
} as const

export type SubscriptionStatus = SubscriptionStatusOrigin

export interface UserModel {
	userId: string;
	name: Optional<string>;
	image: Optional<string>;
	email: string;
	roles: string[];
}
