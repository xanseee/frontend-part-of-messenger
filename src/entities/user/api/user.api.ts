import $api from '../../../shared/api'
import type { User } from '../model/user.types'

export const userApi = {
	refresh: () => $api.get<{user: User, accessToken: string}>('/auth/refresh'),
	getProfile: () => $api.get<User>('/users/profile'),
}