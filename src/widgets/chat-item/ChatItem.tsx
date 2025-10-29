import { useEffect, useState, type FC, type ReactNode } from 'react'
import classes from './ChatItem.module.css';
import { useChatStore } from '../../entities/chat';

interface ChatItemProps {
	idChat: string;
	children?: ReactNode;
	chatName: string;
	previewMessage?: string;
	time: string;
	badge: number;
}

const ChatItem:FC<ChatItemProps> = ({chatName, previewMessage, time, badge, idChat}) => {
	const { currentChat, setCurrentChat, setUnreadCount } = useChatStore();
	const [isActive, setIsActive] = useState<string[]>([classes.chatItem]);

	useEffect(() => {
		if (idChat === currentChat?.id) {
			setIsActive([classes.chatItem, classes.active]);
		} else {
			setIsActive([classes.chatItem]);
		}
	}, [currentChat])

	function setCurChat () {
		setCurrentChat(idChat);
		setUnreadCount(idChat);
	}

	return (
		<div className={isActive.join(' ')} onClick={setCurChat}>
			<div className={classes.chatAvatar}></div>
         <div className={classes.chatInfo}>
            <div className={classes.chatName}>{chatName}</div>
            <div className={classes.chatPreview}>{previewMessage}</div>
         </div>
			<div className={classes.chatMeta}>
				<div className={classes.chatTime}>{time}</div>
				{badge > 0 ? 
					<div className={classes.chatBadge}>{badge}</div> :
					<div className={[classes.chatBadge, classes.hidden].join(' ')}>{badge}</div>
				}
			</div>
		</div>
	)
}

export default ChatItem;