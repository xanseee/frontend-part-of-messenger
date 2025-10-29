import axios from 'axios';
import { useUserStore } from '../../entities/user'

const API_BASE_URL = "http://localhost:5000/";

const $api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
   },
	withCredentials: true
});

$api.interceptors.request.use((config) => {
	const token = useUserStore.getState().accessToken;
	if(token) {
		config.headers.Authorization = `Bearer ${token}`;
	} 
	return config;
});

$api.interceptors.response.use((config) => {
	return config;
}, async (error) => {
	const originalRequest = error.config;
	if(error.response.status == 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true;
		try {
			const response = await axios.get(`${API_BASE_URL}/auth/refresh`);
			useUserStore.getState().accessToken = response.data.accessToken;
			return $api.request(originalRequest);
		} catch(e) {
			console.error('Пользователь не авторизован прям далбаеб тупой');
		}
	}
	throw error;
});

export default $api;