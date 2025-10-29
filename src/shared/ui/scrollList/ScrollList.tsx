import type { FC, ReactNode } from 'react'
import classes from './ScrollList.module.css'

interface ScrollListProps {
	children?: ReactNode;
	[props: string]: any;
}

const ScrollList: FC<ScrollListProps> = ({children, ...props}) => {
	return (
		<nav className={classes.scrollList} {...props}>
			{children}
		</nav>
	)
}

export default ScrollList;