export interface Chat {
	id: string;
	name: string;
	isGroup: boolean;
	createdBy: string;
	unreadCount: number;
	messages: Message[];
	
	participants: Participants[];

	createdAt: string;
	updatedAt: string;
}

export interface Participants {
	id: string, 
	username: string
}

export interface ChatParticipants {
	chatId: string,
	userId: string,
	role: string,
	joinedAt: Date
}

export interface Message {
	id: string;
  	content: string;
	senderId: string;
	chatId?: string;
	messageType?: string;
	status: string;

	createdAt: string;
	updatedAt: string;
}