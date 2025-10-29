import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = ''
}) => {
  const handleClick = () => {
    if (!disabled && !isLoading && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${isLoading ? styles.loading : ''} ${disabled ? styles.disabled : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading && <div className={styles.spinner} />}
      <span className={styles.content}>{children}</span>
    </button>
  );
};

export default Button;