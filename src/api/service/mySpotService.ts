import { MySpotState } from '../../types/states.ts';
import axiosInstance from '../axiosInstance.ts';

/**
 * 특정 사용자의 예약 상태를 업데이트하는 서비스
 * @param userId - 사용자 ID
 * @param parkingSpotId - 예약할 주차 면 ID
 * @param status - 예약 상태 ('예약', '점유', '비점유')
 * @returns 업데이트된 MySpotState
 */
export const updateMySpotService = async ({
    id,
    parkingSpotId,
    status,
}: MySpotState): Promise<MySpotState> => {
    try {
        const response = await axiosInstance.patch(
            `/parkingReservations/${id}`,
            { parkingSpotId, status }
        );
        return response.data; // 서버에서 반환된 MySpot 데이터
    } catch (error) {
        console.error('Failed to update my spot:', error);
        throw error;
    }
};

/**
 * 특정 사용자의 예약 상태를 가져오는 서비스
 * @param userId - 사용자 ID
 * @returns MySpotState
 */
export const fetchMySpotService = async (
    userId: string
): Promise<MySpotState> => {
    try {
        const response = await axiosInstance.get(`/parkingReservations`, {
            params: { userId }, // 쿼리 파라미터 추가
        });

        if (response.data.length === 0) {
            throw new Error('User reservation not found');
        }

        return response.data[0]; // 첫 번째 사용자 데이터 반환
    } catch (error) {
        console.error('Failed to fetch my spot:', error);
        throw error;
    }
};
