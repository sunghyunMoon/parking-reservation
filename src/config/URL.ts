export const BASE_URL =
    process.env.REACT_APP_BASE_URL ||
    (process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001'
        : 'https://my-json-server.typicode.com/sunghyunMoon/parking-reservation-api');
