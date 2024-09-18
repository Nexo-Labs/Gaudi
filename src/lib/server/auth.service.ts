import { SvelteKitAuth } from '@auth/sveltekit';
import Keycloak from '@auth/sveltekit/providers/keycloak';
import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';
import { flatMap, type Optional } from '../domain/common/Optional.js';
import { type UserModel, mapSessionToUserModel } from '../domain/user-model.js';
import { externalUrl } from './routing.js';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from './prisma/prisma_client.js';
import { getUserInfo } from './keycloak.service.js';
import { updateUserRoles } from './prisma/update_user_roles.js';

const authjsSecret = env.PUBLIC_AUTH_SECRET;

const kcConfig = {
	issuer: externalUrl.keycloak.issuer,
	clientId: env.PUBLIC_AUTH_KEYCLOAK_ID,
	clientSecret: env.PUBLIC_AUTH_KEYCLOAK_SECRET
};

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PrismaAdapter(prismaClient),
	trustHost: true,
	secret: authjsSecret,
	providers: [Keycloak(kcConfig)],
	callbacks: {
		async session({ session }: any) {
			return session
		},
		async signIn(data : any) {
			const keycloakRoles = await getUserInfo(data.account.access_token)
			await updateUserRoles(data.user.email as string, keycloakRoles)

			return true
		}
	}
});

export async function getUser(locals: App.Locals): Promise<Optional<UserModel>> {
	return flatMap(await locals.auth(), session => mapSessionToUserModel(session));
}

export async function restrictAuth(locals: App.Locals): Promise<UserModel> {
	const user = await getUser(locals);
	if (!user) return redirect(303, '/');
	return user;
}
