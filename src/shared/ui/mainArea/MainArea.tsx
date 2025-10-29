import type { FC, ReactNode } from 'react'
import classes from './MainArea.module.css';

interface MainAreaProps {
	children: ReactNode;
}

const MainArea: FC<MainAreaProps> = ({children}) => {
	return (
		<main className={classes.chatArea}>
			{children}
		</main>
	)
}

export default MainArea;