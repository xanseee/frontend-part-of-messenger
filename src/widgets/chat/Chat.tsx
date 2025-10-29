import { Button, Input, ScrollList } from '../../shared/ui';
import { Message } from '../';
import classes from './Chat.module.css';
import { useState, useEffect, useRef } from 'react';
import { useChatStore } from '../../entities/chat'
import { useUserStore } from '../../entities/user'

const Chat = () => {
	const [inputValue, setInputValue] = useState('');
	const { currentChat, messages, isLoadingMessages, getMessages, addMessage } = useChatStore();
	const { userId } = useUserStore();
	const scrollRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if(currentChat?.id) {
			getMessages(currentChat?.id, 1, 50);
		}
		console.log(currentChat);
	}, [currentChat?.id]);

	useEffect(() => { // прокручивает всю историю сообщений вниз при загрузке компонента
      const element = scrollRef.current;
      if(element) {
         element.scrollTop = element.scrollHeight; // прокрутка вниз
      }
    }, [messages]); // тут будет массив сообщений

	if(isLoadingMessages) {
		return <div>Fetching messages...</div>
	}

	 function addMsg () {
		if(inputValue && currentChat?.id) {
			console.log('trying to send message Chat.tsx')
			addMessage(currentChat.id, inputValue);
			setInputValue('');
		}
	 }

	 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    	setInputValue(e.target.value);
  	};

	return (
		<>
			<ScrollList ref={scrollRef}>
				{messages.map((msg) => (
					<Message self={msg.senderId === userId} time={msg.updatedAt} key={msg.id}>
						{msg.content}
					</Message>
				))}
			</ScrollList>
			<footer className={classes.messageInput}>
				<Input placeholder="Message" type="text" value={inputValue} onChange={handleChange}/>
				<Button variant="primary" size="sm" onClick={addMsg}>Send</Button>
			</footer>
		</>
	)
}

export default Chat;