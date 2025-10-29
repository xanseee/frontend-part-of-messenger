import type { FC, ReactNode } from 'react'
import classes from './Message.module.css'

interface MessageProps {
	self: boolean;
	time: string;
	children: ReactNode
}

const Message: FC<MessageProps> = ({self, time, children}) => {
	const message = [classes.message];
	if(self) {
		message.push(classes.self)
	}

	return (
		<div className={message.join(' ')}>
         <div className={classes.messageContent}>
            <p>{children}</p>
         </div>
         <div className={classes.messageTime}>{time}</div>
      </div>
	)
}

export default Message;