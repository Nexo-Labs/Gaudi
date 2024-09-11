import { jwtDecode } from 'jwt-decode';
import type { Session } from '@auth/sveltekit';
import type { UserAuthJS } from '../server/auth.service.js';

export interface UserModel {
	userId: string;
	tokenId: string;
	username: string;
	name: string;
	givenName: string;
	familyName: string;
	email: string;
	accessToken: AccessToken;
	refreshToken: RefreshToken;
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

export function mapSessionToUserModel(session: Session): UserModel | undefined {
	const user = session.user as UserAuthJS;

	const accessToken = jwtDecode<AccessToken>(user.access_token);
	const refreshToken = jwtDecode<RefreshToken>(user.refresh_token);

	return {
		userId: user.sub,
		tokenId: user.jti,
		name: user.name,
		username: user.preferred_username,
		email: user.email,
		givenName: user.given_name,
		familyName: user.family_name,
		accessToken,
		refreshToken,
	};
}
