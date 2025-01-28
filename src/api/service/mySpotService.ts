import { BASE_URL } from '../../config/URL.ts';
import { MySpotState } from '../../types/states.ts';
import axiosInstance from '../axiosInstance.ts';

/**
 * 특정 사용자의 예약 상태를 업데이트하는 서비스
 * @param userId - 사용자 ID
 * @param parkingSpotId - 업데이트할 주차 면 ID
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

/**
 * 업데이트 요청이 브라우저 종료 시에도 서버로 전달되도록 보장하는 서비스
 *
 * @param id - 사용자 ID
 * @param parkingSpotId - 업데이트할 주차 면 ID
 * @param status - 예약 상태
 *
 * fetch API의 keepalive: true 옵션을 사용하여
 * 브라우저 종료나 탭 닫힘 상황에서도 네트워크 요청이 완료되도록 보장
 * 페이로드 크기가 약 64KB로 제한되며, 큰 요청에는 적합하지 않습니다.
 */
export const updateMySpotServiceKeepAlive = async ({
    id,
    parkingSpotId,
    status,
}: MySpotState): Promise<void> => {
    try {
        const payload = JSON.stringify({ parkingSpotId, status });
        await fetch(`${BASE_URL}/parkingReservations/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true, // 두 번째 인수로 설정 객체만 전달
        });
    } catch (error) {
        console.error('Failed to update mySpot with keepalive:', error);
        throw error;
    }
};
