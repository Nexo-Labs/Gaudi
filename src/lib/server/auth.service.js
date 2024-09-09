import { SvelteKitAuth } from "@auth/sveltekit";
import Keycloak from "@auth/sveltekit/providers/keycloak";
import { env } from '$env/dynamic/public'

const authjsSecret = env.PUBLIC_AUTH_SECRET;

const kcConfig = {
  issuer: env.PUBLIC_AUTH_KEYCLOAK_ISSUER,
  clientId: env.PUBLIC_AUTH_KEYCLOAK_ID,
  clientSecret: env.PUBLIC_AUTH_KEYCLOAK_SECRET,
};

const { handle: handle, signIn, signOut } = SvelteKitAuth({
  trustHost: true,
  secret: authjsSecret,
  providers: [
    Keycloak(kcConfig)
  ],
  callbacks: {
    async jwt({ user, token, account, profile }) {
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
    async session({ session, token }) {
      // session.user.id = token.id;
      session.user = { ...token };

      return session;
    },
  },
});

export {
  handle,
  signIn, 
  signOut
}