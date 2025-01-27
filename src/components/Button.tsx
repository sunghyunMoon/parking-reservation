import React from 'react';
import styles from '../styles/Button.module.css';

interface ButtonProps {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    className = '',
    type = 'button',
    disabled = false,
    children,
}) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default React.memo(Button);
