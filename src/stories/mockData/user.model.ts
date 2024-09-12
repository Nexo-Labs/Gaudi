import type { UserModel } from "$src/lib/domain/user-model.js";

export const mockUser: UserModel = {
    userId: "123",
    tokenId: "123",
    username: "username",
    name: "name",
    givenName: "givenName",
    familyName: "familyName",
    email: "email@fake.com",
    accessToken: {
        exp: 444,
        iat: 444,
        auth_time: 444,
        jti: "string",
        iss: "string",
        aud: "string",
        sub: "string",
        typ: "string",
        azp: "string",
        sid: "string",
        acr: "string",
        allowed_origins: ["str"],
        realm_access: {
            roles: ["premium"]
        },
        resource_access: {
            account: {
                roles: ["premium"]
            }
        },
        scope: "string",
        email_verified: true,
        name: "string",
        preferred_username: "string",
        given_name: "string",
        locale: "es",
        family_name: "string",
        email: "string",
        },
    refreshToken: {
        iat: 444,
        exp: 444,
        jti: "string",
        iss: "string",
        aud: "string",
        sub: "string",
        typ: "string",
        azp: "string",
        sid: "string",
        scope: "string"
    }
}
