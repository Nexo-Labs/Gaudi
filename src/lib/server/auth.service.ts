import { SvelteKitAuth } from '@auth/sveltekit';
import Keycloak from '@auth/sveltekit/providers/keycloak';
import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';
import { flatMap, type Optional } from '../domain/common/Optional.js';
import { type UserModel, mapSessionToUserModel } from '../domain/user-model.js';
import { externalUrl } from './routing.js';
import { getUserInfo, processRefreshToken } from './keycloak.service.js';
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
		async jwt({ token, account, profile }: any): Promise<UserAuthJS> {
			if (account) {
				return processLoginCallback(token, account, profile);
			} else if (Date.now() < token.expires_at * 1000) {
				return token;
			} else {
				return await processRefreshToken(token);
			}
		},
		async session({ session, token }: any) {
			return {
				...session,
				error: token.error,
				user: { 
					...token, 
					roles: await getUserInfo(token.access_token, token.sub)
				}
			};
		}
	}
});

function processLoginCallback(token: UserAuthJS, account: Account, profile?: Profile): UserAuthJS {
	return {
		...token,
		access_token: account.access_token,
		expires_at: account.expires_at,
		refresh_token: account.refresh_token,
		preferred_username: profile?.preferred_username,
		given_name: profile?.given_name,
		family_name: profile?.family_name,			
};
}

export async function getUser(locals: App.Locals): Promise<Optional<UserModel>> {
	return flatMap(await locals.auth(), (session) => mapSessionToUserModel(session));
}

export async function restrictAuth(locals: App.Locals): Promise<UserModel> {
	const user = await getUser(locals);
	if (!user) return redirect(303, '/');
	return user;
}
