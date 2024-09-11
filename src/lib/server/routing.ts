import { env } from '$env/dynamic/public';

export const externalUrl = {
    keycloak: {
        issuer: env.PUBLIC_AUTH_KEYCLOAK_ISSUER,
        refreshToken: `${env.PUBLIC_AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
        userInfo: `${env.PUBLIC_AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo`,
    }
}