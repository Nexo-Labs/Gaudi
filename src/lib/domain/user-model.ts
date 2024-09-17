import { jwtDecode } from 'jwt-decode';
import type { Session } from '@auth/sveltekit';
import { SubscriptionStatus, type Prisma } from '@prisma/client';
import { flatMap, type Optional } from './common/Optional.js';

type UsersPrismaModel = Prisma.UserGetPayload<{}>

export interface UserModel {
	userId: string;
	name: Optional<string>;
	image: Optional<string>;
	email: string;
	roles: string[];
}

export function mapSessionToUserModel(session: Session): UserModel | undefined {
	const user = session.user as UsersPrismaModel | null;
	if (!user || user.email == null) return undefined;

	const activeSubscription = user.subscriptionStatus?.includes(SubscriptionStatus.ACTIVE) ?? false;

	let roles: string[] = [];
	if (activeSubscription && user.priceId) {
		roles.push(user.priceId);
	}

	return {
		userId: user.id,
		name: user.name,
		email: user.email,
		image: user.image,
		roles: roles
	};
}
