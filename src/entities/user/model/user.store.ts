import { create } from 'zustand'
import type { User } from './user.types'
import { devtools } from 'zustand/middleware'
import { userApi } from '../api/user.api'

interface UserState {
	user: User | null;
	userId: string | null;
	accessToken: string | null;

	isLoading: boolean;

	initUser: (user: User, userId: string, accessToken: string) => void;

	refresh: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
	devtools(
		(set) => ({
			user: null,
			userId: null,
			accessToken: null,

			isLoading: true,
			
			initUser: (user: User, userId: string, accessToken: string) => { set({ user, userId, accessToken }) },

			refresh: async () => {
				set({ isLoading: true })

				try {
					const userInfo = await userApi.refresh().then(data => data.data);
					set({ 
						user: userInfo.user, 
						userId: userInfo.user.id, 
						accessToken: userInfo.accessToken, 
						isLoading: false 
					});
				} catch(error) {
					set({ isLoading: false });
					console.error('Failed to refresh user data', error);
					throw error;
				}
			}
		}),
		{
			name: 'user'
		}
	)
);