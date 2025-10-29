import type { ChangeEvent, FC, ReactNode } from 'react'
import classes from './Input.module.css'

interface InputProps {
	children?: ReactNode;
	[props: string]: any;
	type?: 'text' | 'password';
	name?: string;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string
}

const Input: FC<InputProps> = ({
	type = 'text',
	name,
	value,
	onChange,
	placeholder,
	...props
}) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={classes.searchInput} 
			{...props}
		/>
	)
}

export default Input;