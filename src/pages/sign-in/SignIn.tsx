import type { FC } from 'react'
import classes from './SingIn.module.css';
import { AuthForm } from '../../features/auth';
import { useUserStore } from '../../entities/user/model/user.store'

const SignIn: FC = () => {
   const { user } = useUserStore();

	return (
   	<div className={classes.container}>
			{ !user ? <AuthForm /> : <div> has been login</div> }
   	</div>
  	);
};

export default SignIn;