import React from 'react';
import styles from '../styles/ParkingSpot.module.css';
import {
    ParkingSpot,
    ParkingSpotStatus,
    ParkingSpotType,
} from '../types/states';

interface ParkingSpotProps extends ParkingSpot {
    handleSpotClick: (
        id: string,
        type: ParkingSpotType,
        status: ParkingSpotStatus
    ) => void;
}

const ParkingSpotComponent: React.FC<ParkingSpotProps> = ({
    id,
    type,
    status,
    handleSpotClick,
}) => {
    return (
        <div
            className={`${styles.parkingSpot} ${
                status === '비점유'
                    ? styles.available
                    : status === '점유'
                    ? styles.occupied
                    : styles.reserved
            }`}
            onClick={() => handleSpotClick(id, type, status)}
        >
            <div className={styles.id}>{id}번</div>
            <div className={styles.type}>{type}</div>
            <div className={styles.status}>{status}</div>
        </div>
    );
};

export default React.memo(ParkingSpotComponent);
