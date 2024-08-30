import { jwtDecode } from "jwt-decode";
import type { Session } from "@auth/sveltekit";

export interface UserModel {
  name: string;
  email: string;
  accessToken: AccessToken;
  refreshToken: RefreshToken;
  idToken: IdToken;
}

interface AccessToken {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  sid: string;
  acr: string;
  allowed_origins: string[];
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
  };
  scope: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  locale: string;
  family_name: string;
  email: string;
}

interface RefreshToken {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  sid: string;
  scope: string;
}


interface IdToken {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  sid: string;
  at_hash: string;
  acr: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  locale: string;
  family_name: string;
  email: string;
}

export function mapSessionToUserModel(session: Session): UserModel | undefined {
  const user = session.user as any
  const name = user?.name
  const email = user?.email
  if (user == null || name == null || email == null) return undefined
  
  const accessToken = jwtDecode<AccessToken>(user.accessToken);
  const refreshToken = jwtDecode<RefreshToken>(user.refreshToken);
  const idToken = jwtDecode<IdToken>(user.idToken);

  return {
    name,
    email,
    accessToken,
    refreshToken,
    idToken
  };

}