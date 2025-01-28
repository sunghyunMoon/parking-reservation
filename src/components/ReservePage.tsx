import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/ReservePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { updateMySpot } from '../redux/slices/mySpotSlice.ts';
import { AppDispatch } from '../redux/store.ts';
import { useUpdateParkingSpotMutation } from '../redux/apis/parkingSpotsApi.ts';
import Button from './Button.tsx';
import useHandleBeforeUnload from '../hooks/useHandleBeforeUnload.tsx';
import Timer from './Timer.tsx';
import { updateMySpotServiceKeepAlive } from '../api/service/mySpotService.ts';

const ReservePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [updateParkingSpot] = useUpdateParkingSpotMutation();

    // Redux에서 사용자 예약 정보 가져오기
    const mySpot = useSelector((state: RootState) => state.mySpot);

    // 브라우저 종료 시 예약 상태를 처리
    useHandleBeforeUnload({
        condition: mySpot.status === '예약', // "예약" 상태일 때만 실행
        onUnload: () => {
            updateParkingSpot({ id: mySpot.parkingSpotId!, status: '비점유' });
            updateMySpotServiceKeepAlive({
                id: mySpot.id!,
                parkingSpotId: null,
                status: '비점유',
            });
        },
    });

    const handleTimeExpire = useCallback(() => {
        if (mySpot.status !== '점유') {
            dispatch(
                updateMySpot({
                    id: mySpot.id!,
                    parkingSpotId: mySpot.parkingSpotId!,
                    status: '비점유',
                })
            );
            updateParkingSpot({
                id: mySpot.parkingSpotId!,
                status: '비점유',
            });
            navigate('/parkinglot');
        }
    }, [dispatch, mySpot, updateParkingSpot, navigate]);

    const handleSpotUpdate = (status: '점유' | '비점유', message?: string) => {
        dispatch(
            updateMySpot({
                id: 'user',
                parkingSpotId: mySpot.parkingSpotId,
                status: status,
            })
        );
        updateParkingSpot({ id: mySpot.parkingSpotId!, status });

        if (message) {
            alert(message.replace('{id}', `${mySpot.parkingSpotId}`));
        }

        navigate('/parkinglot');
    };

    if (!id || !mySpot) {
        return <div>해당 주차 면을 찾을 수 없습니다.</div>;
    }

    return (
        <div className={styles.reservePage}>
            <div className={styles.card}>
                {mySpot?.status === '점유' ? (
                    <>
                        <h2>주차 면 {mySpot?.parkingSpotId} 사용 완료</h2>
                        <div className={styles.actions}>
                            <Button
                                className={styles.completeButton}
                                onClick={() =>
                                    handleSpotUpdate(
                                        '비점유',
                                        `주차 면 {id} 사용이 완료되었습니다.`
                                    )
                                }
                            >
                                사용 완료
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2>주차 면 {mySpot?.parkingSpotId} 예약</h2>
                        <div className={styles.actions}>
                            <Button
                                className={styles.reserveButton}
                                onClick={() => handleSpotUpdate('점유')}
                            >
                                예약
                            </Button>
                        </div>
                    </>
                )}
                <Button
                    className={styles.backButton}
                    onClick={() =>
                        mySpot.status === '예약'
                            ? handleSpotUpdate('비점유')
                            : navigate('/parkinglot')
                    }
                >
                    뒤로가기
                </Button>
            </div>
            {mySpot.status === '예약' && (
                <Timer
                    initialTime={300} // 초기 시간: 5분
                    onTimeExpire={handleTimeExpire} // 시간이 만료되었을 때 처리
                />
            )}
        </div>
    );
};

export default ReservePage;
