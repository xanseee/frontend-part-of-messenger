import { useEffect } from 'react'
import { useChatStore } from '../../entities/chat'
import { Sidebar, Header, Input, MainArea } from '../../shared/ui';
import { Chat, ChatHeader, ChatsList, DropdownMenu } from '../../widgets'
import classes from './Messenger.module.css';

const Messenger = () => {
	const { isLoading, currentChat, initSocket, disconnectSocket } = useChatStore();

	useEffect(() => {
		initSocket();
		return () => disconnectSocket();
	}, [initSocket, disconnectSocket]);

	if(isLoading) return <div>Подключаемся к чату...</div>;

	return (
		<div className={classes.messenger}>
			<Sidebar canShift={true} defaultWidth={400}>
				<Header>
					<DropdownMenu/>
					<Input placeholder="Search" type="text"/>					
				</Header>
				<ChatsList />
			</Sidebar>
			{currentChat?.id && 
				<MainArea>
					<ChatHeader />
					<Chat />
				</MainArea>
			}
		</div>
	)
}

export default Messenger;