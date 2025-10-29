import { create } from 'zustand';
import type { Chat, Message } from './chat.types';
import { Socket } from 'socket.io-client'
import { useUserStore } from '../../user'
import { connectSocket } from '../../../shared/websocket'

interface ChatStore {
	socket: Socket | null;
	isLoading: boolean;
	isLoadingMessages: boolean;
	chats: Chat[];
	currentChat: Chat | null;
	messages: Message[];

	error: Error | null;

	// связанное с websocket 
	initSocket: () => void;
	disconnectSocket: () => void;
	getMessages: (chatId: string, page?: number, limit?: number) => void;
	addMessage: (chatId: string, content: string, messageType?: string) => void;
	
	// и то и другое
	setUnreadCount: (chatId: string) => void;

	// связанное только с state
	setChats: (chats: Chat[]) => void; 
	setCurrentChat: (chatId: string) => void;
	setMessages: (messages: Message[]) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
	socket: null,
	isLoading: true,
	isLoadingMessages: false,
	chats: [],
	currentChat: null,
	messages: [],
	error: null,
	
	initSocket: () => {
		const token = useUserStore.getState().accessToken;
		if(!token) { 
			set({ error: new Error('cannot init socket without token')}); 
			return; 
		};

		if(get().socket) { 
			console.warn('[WS] - socket already initialized'); 
			return; 
		};

		const newSocket = connectSocket(token);

    	newSocket.on("connect", () => {
    	  	console.log("[WS] Connected:", newSocket.id);
    	  	set({ isLoading: false });
    	});

		newSocket.on("reconnect_attempt", (attempt) => {
  			console.log(`[WS] Reconnect attempt ${attempt}...`);
  			set({ isLoading: true });
		});

		newSocket.on("reconnect", (attempt) => {
		  	console.log(`[WS] Reconnected after ${attempt} attempts`);
		  	set({ isLoading: false });
		});

		newSocket.on("reconnect_failed", () => {
		  	console.warn("[WS] Failed to reconnect after multiple attempts");
		  	set({ isLoading: true });
		});

    	newSocket.on("disconnect", (reason) => {
    	  	console.warn("[WS] Disconnected:", reason);
    	  	set({ isLoading: true });
    	});

    	newSocket.on("get_chats", (chats) => {
    	  	console.log("[WS] Chats received:", chats);
    	  	set({ chats });
    	});

    	newSocket.on("get_messages", (messages) => {
    	  	console.log("[WS] Messages received:", messages);
    	  	set({ messages, isLoadingMessages: false });
    	});

    	newSocket.on("new_message", (message) => {
    	  	console.log("[WS] New message:", message);
    	  	set((state) => ({
    	    	messages: [...state.messages, message],
    	  	}));
			get().setUnreadCount(message.chatId);
    	});

		newSocket.on("online_users", ({ chatId, online }) => {
			console.log("[WS] Online in chat:", chatId, online);
		})

		newSocket.on("user_status", ({ userId, status }) => {
  			console.log(`[WS] User ${userId} is now ${status}`);
		});

    	set({ socket: newSocket });
	},
	disconnectSocket: () => {
		const socket = get().socket;
		if(socket) {
			socket.removeAllListeners();
			socket.disconnect();
			set({ socket: null, isLoading: true });
		}
	},
	getMessages: (chatId, page = 1, limit = 30) => {
		const socket = get().socket;
		if(!socket?.connected) {
			console.warn("[WS] Socket is disconnected");
			return;
		}
		set({ isLoadingMessages: true });
		socket.emit('get_messages', { chatId, page, limit });
		socket.emit('get_online_users', { chatId });
	},
	addMessage: (chatId, content) => {
		const socket = get().socket;
		if(!socket?.connected) {
			console.warn("[WS] Socket is disconnected");
			return;
		}
		socket.emit('send_message', { chatId, content });
	},

	setUnreadCount: (chatId) => {
		set((state) => ({
			chats: state.chats.map(chat => 
				chat.id == chatId 
				? { ...chat, unreadCount: state.currentChat?.id === chatId ? 0 : chat.unreadCount + 1 } 
				: chat
			)
		}));
		if(get().currentChat?.id === chatId) {

		}
	},

	setChats: (chats) => set({ chats: chats }),
	setCurrentChat: (chatId) => {
		const chat = get().chats.find(chat => chat.id === chatId) || null;
		set({ currentChat: chat });
	},
	setMessages: (messages) => set({ messages }),
}));