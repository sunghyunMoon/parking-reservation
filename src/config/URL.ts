/**
 * BASE_URL 설정
 * 개발 환경(http://localhost:3001)만 고려하여 설정
 * 배포 환경은 Railway 배포 서버로 설정
 */
export const BASE_URL =
    process.env.REACT_APP_BASE_URL ||
    (process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001'
        : 'https://parking-reservation-api-production.up.railway.app/');
