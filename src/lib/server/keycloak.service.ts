import { externalUrl } from './routing.js';

export async function getUserInfo(accessToken: string): Promise<string[]> {
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
   return [
      ...userInfo.resource_access.web.roles,
      ...userInfo.resource_access.account.roles, 
      ...userInfo.realm_access.roles
   ];
}
