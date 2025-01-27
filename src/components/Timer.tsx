import React, { useEffect, useState } from 'react';
import styles from '../styles/Timer.module.css';

interface TimerProps {
    initialTime: number; // 초기 시간 (초 단위)
    onTimeExpire: () => void; // 시간이 만료되었을 때 실행될 콜백 함수
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeExpire }) => {
    const [remainingTime, setRemainingTime] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prev) => prev - 1);
        }, 1000);

        if (remainingTime <= 0) {
            clearInterval(timer);
            onTimeExpire();
        }

        return () => clearInterval(timer);
    }, [remainingTime, onTimeExpire]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={styles.timer}>
            <p>남은 시간: {formatTime(remainingTime)}</p>
            {remainingTime <= 60 && (
                <p className={styles.warning}>⚠️ 예약 시간이 1분 남았습니다!</p>
            )}
        </div>
    );
};

export default Timer;
