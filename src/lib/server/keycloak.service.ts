import { env } from '$env/dynamic/public';
import { externalUrl } from './routing.js';


export async function getUserInfo(accessToken: string, userId: string): Promise<string[]> {
   const response = await fetch(externalUrl.keycloak.userInfo, {
      method: 'GET',
      headers: {
         'Authorization': `Bearer ${accessToken}`,
         'Content-Type': 'application/json'
      }
   });

   if (!response.ok) {
      throw new Error(`Error al obtener los grupos: ${response.statusText}`);
   }

   const userInfo = await response.json();
   return userInfo.resource_access.web.roles;
}

type Token = { refresh_token?: string, access_token: string, expires_at: number }

export async function processRefreshToken(token: Token): Promise<any> {
   if (!token.refresh_token) throw new TypeError("Missing refresh_token");

   const response = await fetch(
      externalUrl.keycloak.refreshToken,
      {
         method: "POST",
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         body: new URLSearchParams({
            client_id: env.PUBLIC_AUTH_KEYCLOAK_ID,
            client_secret: env.PUBLIC_AUTH_KEYCLOAK_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
         }),
      }
   );

   const responseJson = await response.json();

   if (!response.ok) throw responseJson;

   const newTokens = responseJson as {
      access_token: string;
      expires_in: number;
      refresh_token?: string;
   };

   token.access_token = newTokens.access_token;
   token.expires_at = Math.floor(Date.now() / 1000 + newTokens.expires_in);
   if (newTokens.refresh_token) token.refresh_token = newTokens.refresh_token;
   return token;
}
