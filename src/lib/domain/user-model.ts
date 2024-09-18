import { jwtDecode } from 'jwt-decode';
import type { Session } from '@auth/sveltekit';
import { flatMap, type Optional } from './common/Optional.js';


export interface UserModel {
	userId: string;
	name: Optional<string>;
	image: Optional<string>;
	email: string;
	roles: string[];
}
