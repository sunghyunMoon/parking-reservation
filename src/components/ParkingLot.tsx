import React, { useCallback } from 'react';
import ParkingSpotComponent from './ParkingSpot.tsx';
import styles from '../styles/ParkingLot.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import {
    ParkingSpot,
    ParkingSpotStatus,
    ParkingSpotType,
} from '../types/states.ts';
import { useFetchParkingSpotsQuery } from '../redux/apis/parkingSpotsApi.ts';
import { useParkingSpotManager } from '../hooks/useParkingSpotManager.tsx';
import LoadingIndicator from './LoadingIndicator.tsx';

const ParkingLot: React.FC = () => {
    const { data: parkingSpots = [], isLoading } = useFetchParkingSpotsQuery(
        undefined,
        {
            pollingInterval: 2000,
        }
    );
    const navigate = useNavigate();
    const mySpot = useSelector((state: RootState) => state.mySpot);
    const { validateParkingSpot, reserveParkingSpot } = useParkingSpotManager();

    const handleSpotClick = useCallback(
        async (
            id: string,
            type: ParkingSpotType,
            status: ParkingSpotStatus
        ) => {
            if (mySpot.status !== '비점유') {
                if (status === '점유' && id === mySpot.parkingSpotId) {
                    navigate(`/reserve/${id}`);
                } else {
                    alert(`주차면 ${mySpot.parkingSpotId}번에 예약하셨습니다.`);
                }
            } else {
                if (status === '비점유') {
                    const isValid = await validateParkingSpot(id);
                    if (isValid) {
                        await reserveParkingSpot(id);
                    }
                } else {
                    return;
                }
            }
        },
        [mySpot, validateParkingSpot, reserveParkingSpot, navigate]
    );

    if (isLoading) {
        return <LoadingIndicator message="주차장 데이터를 불러오는 중..." />;
    }

    return (
        <div className={styles.parkingLot}>
            <h1 className={styles.title}>지하 주차장 도면</h1>

            <div className={styles.parkingLayout}>
                {Array.from({ length: 4 }).map((_, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {parkingSpots
                            .slice(rowIndex * 5, rowIndex * 5 + 5)
                            .map((spot: ParkingSpot) => (
                                <ParkingSpotComponent
                                    key={spot.id}
                                    id={spot.id}
                                    type={spot.type}
                                    status={spot.status}
                                    handleSpotClick={handleSpotClick}
                                />
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParkingLot;
