import { SvelteKitAuth } from "@auth/sveltekit";
import { EscotaAuth } from "./auth_builder.js"
import Keycloak from "@auth/sveltekit/providers/keycloak";
import { env } from '$env/dynamic/public'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require('@prisma/client');

const authjsSecret = env.PUBLIC_AUTH_SECRET; // Use Environment Variables AUTH_SECRET in prod

const kcConfig = {
  issuer: env.PUBLIC_AUTH_KEYCLOAK_ISSUER, // Use Environment Variables AUTH_KEYCLOAK_ISSUER in prod
  clientId: env.PUBLIC_AUTH_KEYCLOAK_ID, // Paste "Client id" here. Use Environment Variables AUTH_KEYCLOAK_ID in prod
  clientSecret: env.PUBLIC_AUTH_KEYCLOAK_SECRET, // Paste "Client secret" here. Use Environment Variables AUTH_KEYCLOAK_ISSUER in prod
};
const db = new PrismaClient()

const { handle: handle, signIn, signOut } = EscotaAuth({
  trustHost: true,
  adapter: PrismaAdapter(db),
  secret: authjsSecret,
  providers: [Keycloak(kcConfig)],
});

export {
  handle,
  signIn, 
  signOut
}

