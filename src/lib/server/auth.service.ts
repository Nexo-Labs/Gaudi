import { SvelteKitAuth } from '@auth/sveltekit';
import Keycloak from '@auth/sveltekit/providers/keycloak';
import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';
import { flatMap, type Optional } from '../domain/common/Optional.js';
import { type UserModel, mapSessionToUserModel } from '../domain/user-model.js';
import { externalUrl } from './routing.js';
import { getUserInfo, processRefreshToken } from './keycloak.service.js';

const authjsSecret = env.PUBLIC_AUTH_SECRET;

const kcConfig = {
	issuer: externalUrl.keycloak.issuer,
	clientId: env.PUBLIC_AUTH_KEYCLOAK_ID,
	clientSecret: env.PUBLIC_AUTH_KEYCLOAK_SECRET
};

export type UserAuthJS = {
	sub: string;
	family_name: string;
	given_name: string;
	name: string;
	preferred_username: string;
	access_token: string;
	refresh_token: string;
	expires_at: number;
	email: string;
	exp: number;
	iat: number;
	jti: string;
	roles: string[];
};

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	secret: authjsSecret,
	providers: [Keycloak(kcConfig)],
	callbacks: {
		async jwt({ user, token, account, profile }: any): Promise<UserAuthJS> {
			if (profile) {
				token = loadProfileDataToToken(token, profile);
			}
			if (account) {
				return {
					...token,
					access_token: account.access_token,
					expires_at: account.expires_at,
					refresh_token: account.refresh_token,
				}
			} else if (Date.now() < token.expires_at * 1000) {
				const roles = await getUserInfo(token.access_token, token.sub);
				return {
					roles,
					...token
				}
			} else {
				return await processRefreshToken(token);
			}
		},
		async session({ session, token }: any) {
			session.user = { ...token };
			session.error = token.error
			return session;
		}
	}
});

function loadProfileDataToToken(token: any, profile: any) {
	return {
		...token,
		preferred_username: profile.preferred_username,
		given_name: profile.given_name,
		family_name: profile.family_name,
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
