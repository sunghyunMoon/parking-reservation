/*
 * 주차 면 상태 타입
 * 주차 면의 현재 상태를 나타냄
 */
export type ParkingSpotStatus = '비점유' | '점유' | '예약';

/*
 * 주차 면 타입
 * 특정 조건이 있는 주차 면 유형을 정의
 */
export type ParkingSpotType = '일반' | '장애인' | '전기차' | '여성' | '노약자';

/*
 * 주차 면 인터페이스
 * 주차 면 데이터를 구성하는 기본 구조
 */
export interface ParkingSpot {
    id: string; // 주차 면 ID
    type: ParkingSpotType; // 특별 주차 면 여부
    status: ParkingSpotStatus; // 현재 점유 여부
}

/*
 * mySpot 스키마에 따른 상태 타입 정의
 * 사용자 예약 정보
 */
export interface MySpotState {
    id: Nullable<string>; // 사용자 ID
    parkingSpotId: Nullable<string>; // 예약된 주차 면 ID
    status: Nullable<ParkingSpotStatus>; // 예약 상태
    loading?: boolean; // 로딩 상태
    error?: Nullable<string>; // 에러 메시지
}
