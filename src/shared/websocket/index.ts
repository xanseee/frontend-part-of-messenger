import { io, Socket } from 'socket.io-client';

const URL = 'ws://localhost:5000/chat';

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
	if(socket?.connected) return socket;

	socket = io(URL, {
		transports: ["websocket"],
		auth: { token },
		reconnection: true,
		reconnectionAttempts: Infinity,
		reconnectionDelay: 1000
	});

	// socket.on('connect', () => {
	// 	console.log('WS connected', socket?.id);
	// });

	// socket.on('disconnect', () => {
	// 	console.log('WS disconnected');
	// });

	return socket;
}

export const getSocket = (): Socket | null => socket;