import classes from './Disconnected.module.css';

const DisconnectedWidget = () => {
	return (
		<div className={`${classes.widget}`}>
      	<span className={classes.text}>отключен</span>
    	</div>
	);
};

export default DisconnectedWidget;