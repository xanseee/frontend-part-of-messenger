import type { FC, ReactNode } from 'react';
import { ScrollList } from '../../shared/ui';
import { ChatItem } from '../';
import { useChatStore } from '../../entities/chat';

interface ChatsListProps {
	children?: ReactNode;
}

const ChatsList: FC<ChatsListProps> = ({}) => {
	const { chats } = useChatStore();
	
	return (
		<ScrollList>
			{chats.map(chat =>
				<ChatItem
					key={chat.id} 
					idChat={chat.id}
					chatName={chat.name} 
					previewMessage={chat.messages?.[0].content} 
					time={chat.messages?.[0].createdAt}
					badge={chat.unreadCount || 0}
				/>
			)}
		</ScrollList>
	)
}

export default ChatsList;