import type { User } from '../../../entities/user'

export interface AuthCredentials {
	username: string;
	password: string;
};

export interface AuthResponse {
	user: User
	accessToken: string;
}