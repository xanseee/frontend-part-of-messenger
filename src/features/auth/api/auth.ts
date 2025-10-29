import { useUserStore } from '../../../entities/user/model/user.store'
import $api from '../../../shared/api';
import type { AuthCredentials, AuthResponse } from '../model/auth.types'

export const loginApi = async (credentials: AuthCredentials) => {
	const response = await $api.post<AuthResponse>('/auth/login', credentials).then((res) => res.data);
	
	useUserStore.getState().initUser(response.user, response.user.id, response.accessToken);
};

export const registerApi = async (credentials: AuthCredentials) => {
	const response = await $api.post<AuthResponse>('/auth/registration', credentials).then((res) => res.data);

	useUserStore.getState().initUser(response.user, response.user.id, response.accessToken);
};

