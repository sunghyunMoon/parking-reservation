import React from 'react';
import styles from '../styles/LoadingIndicator.module.css';

interface LoadingIndicatorProps {
    message?: string; // 로딩 메시지
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>{message || '로딩 중...'}</p>
        </div>
    );
};

export default LoadingIndicator;
