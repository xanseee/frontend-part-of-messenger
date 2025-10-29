import { Header } from '../../shared/ui';
import { useChatStore } from '../../entities/chat/model/chat.store';
import classes from './ChatHeader.module.css';

const ChatHeader = () => {
	const { currentChat } = useChatStore();

	return (
		<Header>
			<div className={classes.chatAvatar}></div>
         <div className={classes.chatDetails}>
            <div className={classes.chatName}>{currentChat?.name}</div>
            <div className={classes.chatStatus}>{'chatStatus'}</div>
         </div>
		</Header>
	)
}

export default ChatHeader;