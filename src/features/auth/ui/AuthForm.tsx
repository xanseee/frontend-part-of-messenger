import { useState, type FC } from 'react'
import classes from './AuthForm.module.css';
import { Input, Button } from '../../../shared/ui'
import { loginApi, registerApi } from '../api/auth';

interface RegistrationFormData {
   username: string;
   password: string;
}

const AuthForm: FC = () => {
	const [formData, setFormData] = useState<RegistrationFormData>({ username: '', password: '' });
	const [isLoginForm, setIsLoginForm] = useState<boolean>(false);
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const changeForm = () => setIsLoginForm(true);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (isLoginForm) {
			loginApi(formData);
		} else {
			registerApi(formData);
		}
	};

	return (
		<div className={classes.registrationCard}>
   	   { !isLoginForm ?
				<h1 className={classes.title}>Sign in to messenger</h1> :
				<h1 className={classes.title}>Log in to messenger</h1>
			}
   	   <p className={classes.subtitle}>Please enter your details</p>
   	   <form onSubmit={handleSubmit} className={classes.form}>
   	   	<div className={classes.inputGroup}>
   	   	  	<Input
   	   	  	  	type="text"
   	   	  	  	name="username"
   	   	  	  	value={formData.username}
   	   	  	  	onChange={handleInputChange}
   	   	  	  	placeholder="Name"
   	   	  	  	required
   	   	  	/>
   	   	</div>
   	   	<div className={classes.inputGroup}>
					<Input 
						type='password'
						name='password'
						value={formData.password}
						onChange={handleInputChange}
						placeholder='Password'
						required
					/>
   	   	</div>
				{!isLoginForm ? 
					<Button variant='outline' type='submit' className={classes.submitButton}> SIGN UP </Button> :
					<Button variant='outline' type='submit' className={classes.submitButton}> LOG IN </Button>
				}
   	  	</form>
			{ !isLoginForm && <Button variant='ghost' type='button' className={classes.qrButton} onClick={changeForm}> LOG IN </Button> }
   	</div>
	);
}

export default AuthForm;