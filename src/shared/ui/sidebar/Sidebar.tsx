import { useEffect, useRef, useState, type FC, type ReactNode } from 'react'
import classes from './Sidebar.module.css';

interface ChatSidebarProps {
	children?: ReactNode;
	canShift?: boolean;
	defaultWidth?: number;
}

const Sidebar: FC<ChatSidebarProps> = ({children, canShift = false, defaultWidth = 400}) => {
	const [width, setWidth] = useState(defaultWidth);
	const [isResizing, setIsResizing] = useState(false);
	const sidebarRef = useRef<HTMLElement>(null);

	const startResize = () => {
		setIsResizing(true);
		document.body.style.userSelect = "none";
	}

	const stopResize = () => { 
		setIsResizing(false);
		document.body.style.userSelect = "auto";
	}

	const resize = (e: MouseEvent) => {
		if(isResizing) {
			const newWidth = e.clientX;
			if(newWidth > 200 && newWidth < 600) {
				setWidth(newWidth);
			}
		}
	}

	useEffect(() => {
    	window.addEventListener("mousemove", resize);
    	window.addEventListener("mouseup", stopResize);
    	return () => {
      	window.removeEventListener("mousemove", resize);
      	window.removeEventListener("mouseup", stopResize);
    	};
  });

	return(
		<aside ref={sidebarRef} className={classes.sidebar} style={{ width }}>
			{children}
			{canShift && <div className={classes.resizer} onMouseDown={startResize}></div>}
		</aside>
	)
}

export default Sidebar;