import { jwtDecode } from 'jwt-decode';
import type { Session } from '@auth/sveltekit';
import { SubscriptionStatus, type Prisma } from '@prisma/client';
import type { UserWithStripeCustomers } from '../server/prisma/get_user_by_email.js';
import type { Optional } from './common/Optional.js';

export interface UserModel {
	userId: string;
	name: Optional<string>;
	image: Optional<string>;
	email: string;
	roles: string[];
}

export function mapSessionToUserModel(session: Session): UserModel | undefined {
	const user = session.user as UserWithStripeCustomers | null;
	if (!user) return undefined;
	if (user.email == null) return undefined;
	
	return {
		userId: user.id,
		name: user.name,
		email: user.email,
		image: user.image,
		roles: user.stripeCustomers.flatMap((customer) => SubscriptionStatus[customer.subscriptionStatus])
	};
}
