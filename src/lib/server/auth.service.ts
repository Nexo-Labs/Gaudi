import { SvelteKitAuth } from '@auth/sveltekit';
import Keycloak from '@auth/sveltekit/providers/keycloak';
import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';
import { flatMap, type Optional } from '../domain/common/Optional.js';
import { type UserModel, mapSessionToUserModel } from '../domain/user-model.js';
import { externalUrl } from './routing.js';
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const authjsSecret = env.PUBLIC_AUTH_SECRET;

const kcConfig = {
	issuer: externalUrl.keycloak.issuer,
	clientId: env.PUBLIC_AUTH_KEYCLOAK_ID,
	clientSecret: env.PUBLIC_AUTH_KEYCLOAK_SECRET
};

export type UserAuthJS = {
	sub: string;
	family_name?: string;
	given_name?: string;
	preferred_username?: string;
	name: string;
	access_token: string;
	refresh_token: string;
	expires_at: number;
	email: string;
	exp: number;
	iat: number;
	jti: string;
	roles: string[];
};

type Profile = {
	preferred_username: string;
	given_name: string;
	family_name: string;
};
type Account = {
	access_token: string;
	expires_at: number;
	refresh_token: string;
};

export const db = new PrismaClient();

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PrismaAdapter(db),
	trustHost: true,
	secret: authjsSecret,
	providers: [Keycloak(kcConfig)],
	callbacks: {
		async session({ session, options }: any) {
			const user = await options.adapter.getUserByEmail(session.user.email)

			if (user?.customerId) {
			  session.customerId = user.customerId
			}
	
			if (user?.subscriptionId) {
			  session.subscription = {
				id: user.subscriptionId,
				priceId: user.priceId,
				plan: user.plan,
				status: user.subscriptionStatus.toLowerCase()
			  }
			}
	
			return session
		}
	}
});


export async function getUser(locals: App.Locals): Promise<Optional<UserModel>> {
	return flatMap(await locals.auth(), (session) => mapSessionToUserModel(session));
}

export async function restrictAuth(locals: App.Locals): Promise<UserModel> {
	const user = await getUser(locals);
	if (!user) return redirect(303, '/');
	return user;
}
