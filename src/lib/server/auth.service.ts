import { SvelteKitAuth } from "@auth/sveltekit";
import Keycloak from "@auth/sveltekit/providers/keycloak";
import { env } from '$env/dynamic/public'
import { redirect } from "@sveltejs/kit";
import { flatMap, type Optional } from "../domain/common/Optional.js";
import { type UserModel, mapSessionToUserModel } from "../domain/user-model.js";

const authjsSecret = env.PUBLIC_AUTH_SECRET;

const kcConfig = {
  issuer: env.PUBLIC_AUTH_KEYCLOAK_ISSUER,
  clientId: env.PUBLIC_AUTH_KEYCLOAK_ID,
  clientSecret: env.PUBLIC_AUTH_KEYCLOAK_SECRET,
};

export const { handle, signIn, signOut } = SvelteKitAuth({
  trustHost: true,
  secret: authjsSecret,
  providers: [
    Keycloak(kcConfig)
  ],
  callbacks: {
    async jwt({ user, token, account, profile }: any) {
      if (user) {
        token.id = user.id;
      }
      if (profile) {
        token.preferred_username = profile.preferred_username;
        token.given_name = profile.given_name;
        token.family_name = profile.family_name;
      }
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;     
      }

      return token;
    },
    async session({ session, token }: any) {
      // session.user.id = token.id;
      session.user = { ...token };

      return session;
    },
  },
});

export async function getUser(locals: App.Locals): Promise<Optional<UserModel>> {
  const session = await locals.auth();
  if (!session) return redirect(303, "/");

  const user = flatMap(session, (session) => mapSessionToUserModel(session));
  return user;
}



