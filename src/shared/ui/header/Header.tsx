import type { FC, ReactNode } from 'react'
import classes from './Header.module.css'

interface HeaderProps {
	children?: ReactNode;
	[prop: string]: any;
}

const MyHeader:FC<HeaderProps> = ({children, ...props}) => { 
	return (
		<header {...props} className={classes.header}>
			{children}
		</header>
	)
}

export default MyHeader;