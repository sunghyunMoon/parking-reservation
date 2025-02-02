# 주차면 예약 시스템 UI 개발

## 배포

https://sunghyunmoon.github.io/parking-reservation/

## 🔧 클라이언트 환경 구성

**의존성 설치 및 실행**  
  프로젝트 루트 디렉토리에서 의존성을 설치합니다.
   ```bash
   npm install
   npm run start
   ```
   
## 📡 JSON 서버 실행

**JSON 서버 디렉토리로 이동**  
   프로젝트 루트 디렉토리에서 JSON 서버 디렉토리로 이동합니다.
   ```bash
   cd server
   npm install
   npm run start
```

**기본 API 엔드포인트**

JSON 서버는 기본적으로 3001 port에서 실행되며, 다음 엔드포인트를 제공합니다:

- 주차 면 정보: /parkingSpots
- 예약 정보: /parkingReservations

## 프론트엔드 아키텍처
![image](https://github.com/user-attachments/assets/a222ba13-d0b4-4006-91df-86a4cf6e0ef8)

### 프로젝트 전반적인 구조

- 이 프로젝트는 주차면 예약 시스템으로, 전역 상태 관리를 위해 **Redux Toolkit**을 사용합니다.
- 주요 데이터 흐름은 **RTK Query**를 통한 주차면 데이터 관리와 **Redux Toolkit Thunk**를 사용한 사용자 예약 상태 관리로 구성됩니다.

### 상태 관리

- **RTK Query**는 주차면 데이터(`parkingSpots`)를 서버와 동기화하며 폴링 및 캐시 관리를 자동으로 처리합니다.
- **Redux Toolkit Thunk**는 사용자의 예약 상태(`mySpotSlice`)를 관리하며 클라이언트-서버 간 비동기 로직을 실행합니다.

### 상태

| 상태 이름 | 속성 | 설명 |
| --- | --- | --- |
| **mySpot** | `id` | 사용자 ID |
|  | `parkingSpotId` | 주차 면 ID |
|  | `status` | 사용자의 예약 상태 ('예약', '점유', '비점유') |
| **parkingSpots** | `id` | 주차 면 ID |
|  | `type` | 주차 면 유형 |
|  | `status` | 주차 면의 현재 상태('예약', '점유', '비점유') |

---

## 프로젝트 전제 조건

- **mySpot(사용자 예약 정보)**
    - id가 “user”인 사용자가 주차창 예약 화면에 들어왔다고 가정합니다.
    - 사용자는 하나의 주차 면만 예약할 수 있습니다.
    - 사용자가 ‘비점유’ 상태의 주차 면을 예약하면, status가 ‘예약’으로 변경되고 예약페이지로 이동합니다.
    - 예약페이지에서 5분 동안 예약 완료를 하지 않으면 상태는 초기화되고 주차장 화면으로 돌아갑니다.
- **parkingSpots(전체 주차 면 데이터)**
    - 2초 주기마다 서버로부터 데이터가 갱신됩니다.
    - 사용자의 예약 상태가 ‘비점유’인 경우 ‘비점유’인 주차 면에 대해서만 예약 가능합니다.
    
    ---
    

## 데이터 불일치에 대한 고려

### 주차 면 유효성 검사

- 예약을 하기 위해 특정 주차면 클릭 시 해당 주차 면의 현재 상태를 서버로 부터 직접 확인합니다.
- 주차 면의 상태가 ‘비점유’가 아닌 경우, 유효하지 않음을 사용자에게 알립니다.

### 실시간 데이터 동기화

- **RTK Query**의 `pollingInterval` 옵션을 사용하여 2초마다 서버에서 최신 데이터를 가져옵니다.
- 폴링되기 전 다른 사용자가 예약한 주차 면을 클릭한 경우, 유효성 검사를 실시해 유효하지 않음을 사용자에게 알립니다.

---

## 코드 설명

### 디렉토리 구조

```ruby
src/
├── app/
│   ├── VoltUpParkingApp.tsx               # 최상위 애플리케이션 컴포넌트
├── api/
│   ├── axiosInstance.ts                   # Axios 인스턴스 설정
│   ├── service/
│   │   ├── mySpotService.ts               # 주차 면 관련 API 서비스
├── components/
│   ├── Button.tsx                         # 예약 페이지 버튼
│   ├── LoadingIndicator.tsx               # 로딩 중
│   ├── ParkingLot.tsx                     # 주차장 화면
│   ├── ParkingSpot.tsx                    # 개별 주차 면 컴포넌트
│   ├── ReservePage.tsx                    # 예약 페이지
│   ├── Timer.tsx                          # 예약 페이지 타이머
├── config/
│   ├── URL.ts                             # URL 정보
├── hooks/
│   ├── useParkingSpotManager.ts           # 예약 관련 로직
├── redux/
│   ├── apis/
│   │   ├── parkingSpotsApi.ts             # RTK Query로 주차 면 데이터 관리
│   ├── slices/
│   │   ├── mySpotSlice.ts                 # 사용자 예약 상태를 관리하는 Slice
│   ├── store.ts                           # Redux Store로 전역 상태 관리
├── routing/  
│   ├── AppRoutes.tsx                      # 라우팅 컴포넌트를 정의      
├── styles/
│   ├── Button.module.css                  # 버튼 스타일
│   ├── LoadingIndicator.module.css        # 로딩 중 스타일
│   ├── ParkingLot.module.css              # 주차장 스타일
│   ├── ParkingSpot.module.css             # 주차 면 스타일
│   ├── ReservePage.module.css             # 예약 페이지 스타일
│   ├── Timer.module.css                   # 타이머 스타일
├── types/
│   ├── api.ts                             # API 관련 타입
│   ├── states.ts                          # 상태 관련 타입
```

### API

- **사용자 예약 정보 관련**(api/service/mySpotService.ts)
    - **updateMySpotService** : 특정 사용자의 예약 상태를 업데이트하는 서비스
        - request : 사용자 ID, 주차면 ID, 예약 상태
        - response : 업데이트된 사용자 예약 상태 정보(mySpot)
    - **fetchMySpotService** : 특정 사용자의 예약 상태를 가져오는 서비스
        - request : 사용자 ID
        - response : 사용자 예약 상태 정보(mySpot)
- **전체 주차 면 데이터 관련**(redux/apis/parkingSpotsApi.ts)
    - **`fetchParkingSpots`** : 전체 주차 면 데이터를 조회
        - reqeust : 없음
        - reseponse : 
        주차 면 데이터 전체 리스트(ParkingSpot[])
    - **`updateParkingSpot`** : 특정 주차 면의 상태를 업데이트
        - reqeust : 주차 면 ID, 주차 면 상태
        - reseponse : 업데이트된 주차 면 데이터(ParkingSpot)

### React Component

**VoltUpParkingApp**

- 애플리케이션의 최상위 컴포넌트로, 전역 상태 초기화 및 라우팅 설정을 담당

**ParkingLot**

- 주차장 화면을 렌더링하며, 주차 면(ParkingSpot) 리스트를 표시하고 사용자 상호작용 처리
- `useFetchParkingSpotsQuery`를 사용해 주차 면 데이터를 실시간으로 갱신(2초 폴링)
- 주차 면 클릭 시 유효성 검사(`validateParkingSpot`) 및 예약 처리(`reserveParkingSpot`)
    - 현재 사용자의 상태가 ‘비점유’인 경우
        - 선택한 주차 면의 상태가 ‘비점유’인 경우
            - 선택한 주차 면이 유효한 경우 예약 처리 수행
        - 선택한 주차 면의 상태가 ‘비점유’가 아닌 경우
            - early return
    - 현재 사용자의 상태가 ‘비점유’가 아닌 경우
        - 선택한 주차 면의 상태가 ‘점유’이고, 선택한 주차 면과 사용자 주차 면이 같다면 예약 페이지로 이동해 [사용 완료] 버튼을 선택할 수 있음
        - 선택한 주차 면과 사용자 주차 면이 다른 경우, “주차면 x번에 예약하셨습니다.” 메세지를 담은 alert 수행

**ReservePage**

- 선택한 주차 면의 예약 또는 점유 상태를 관리하는 화면
- 사용자 예약 상태에 따라 [예약], [사용 완료] 버튼 제공
- 사용자 예약 상태가 ‘예약’인 경우
    - 타이머 만료 시 와[뒤로 가기] 버튼 클릭 시 상태가 ‘비점유’로 업데이트

### Custom Hook

**useParkingSpotManager**

- 주차 면 예약과 유효성 검사를 처리하는 **재사용 가능한 로직**을 제공
- 제공 함수
    - `validateParkingSpot`
        - 특정 주차 면의 상태를 서버에 직접 요청하여 예약 가능한지 유효성 검사
            
            ```jsx
            const result = await dispatch(
                parkingSpotsApi.endpoints.fetchParkingSpotById.initiate(id)
            ).unwrap();
            ```
            
            - 전체 데이터들이 RTK Query에서 캐시로 관리되기 때문에, 데이터 요청시 기본적으로 캐시된 데이터를 반환해 유효성을 검증하지 못함
            - `dispatch`와 `initiate`를 이용해 캐시를 무시하고 서버에 직접 요청
        - 예약이 불가능하면 사용자에게 알림 표시
    - `reserveParkingSpot`
        - 주차 면 예약을 처리하고, 상태를 **서버와 스토어**에 업데이트
        - 업데이트 후 예약 페이지로 이동

## Redux

**mySpotSlice**

- 사용자 예약 상태를 관리하는 Redux 슬라이스
- `fetchMySpot`으로 서버에서 예약 상태를 가져오고, `updateMySpot`으로 상태를 업데이트
- 비동기 요청의 진행 상태(pending, fulfilled, rejected)를 처리하여 로딩 상태와 에러 메시지를 관리
- 사용자 예약 정보를 전역 상태로 유지

**parkingSpotsApi**

- Tag : `ParkingSpots`
- `useFetchParkingSpotsQuery`
    - 전체 주차 면 데이터를 가져옴
- `useFetchParkingSpotByIdQuery`
    - 특정 주차 면 데이터를 조회
- `useUpdateParkingSpotMutation`
    - 특정 주차 면 상태를 업데이트하며, 관련 캐시를 자동으로 무효화
    
    ---
    

## 최적화

### 데이터 처리 최적화

1. **캐싱 구조 활용**
- RTK Query의 캐싱 구조를 활용해 서버에서 데이터를 가져온 후 캐시에 저장하여 재요청 시 불필요한 API 호출을 방지했습니다.
1. **태그를 이용한 특정 데이터 invalidation**
- 특정 데이터가 변경되거나 업데이트될 때, 해당 데이터만 무효화하여 관련된 쿼리만 다시 요청하도록 했습니다.

```jsx
endpoints: (builder) => ({
        fetchParkingSpots: builder.query<ParkingSpot[], void>({
            query: () => 'parkingSpots',
            **providesTags**: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) =>
                                  ({ type: 'ParkingSpots', id } as const)
                          ),
                          { type: 'ParkingSpots', id: 'LIST' },
                      ]
                    : [{ type: 'ParkingSpots', id: 'LIST' }],
        }),
        updateParkingSpot: builder.mutation<
            ParkingSpot,
            { id: string; status: ParkingSpotStatus }
        >({
            query: ({ id, status }) => ({
                url: `parkingSpots/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            **invalidatesTags**: (result, error, { id }) => [
                { type: 'ParkingSpots', id },
            ],
        }),
  })
```

- 각 id 별 parkingSpot 데이터에 대해 태그를 생성해, 특정 데이터가 변경되었을때 그 데이터만 invalidation하도록 했습니다.
- 따라서 RTK Query는 invalidation된 데이터만 재요청하게 되고, 이는 데이터가 많아지거나, 실시간 업데이트가 빈번한 상황에서 최적화에 도움이 될것이라 생각합니다.
- 리스트 전체를 위한 태그도 추가해 개별 데이터뿐 아니라 리스트 전체가 변경될 때도 효율적으로 invalidation 및 재요청이 가능하도록 구성했습니다.

### 렌더링 성능 최적화

![image](https://github.com/user-attachments/assets/a0c7b29f-b9dd-4c5a-b1fc-9fde050155a6)

- **React.memo**
    - ParkingSpotComponent를 React.memo로 감싸, props 변경이 없을 경우 리렌더링을 방지했습니다.
- u**seCallback**
    - 부모인 ParkigLot 컴포넌트가 자식 ParkingSpot 컴포넌트에게 `handleSpotClick` 이벤트 핸들러를 props로 넘겨줍니다.
    - `handleSpotClick` 함수를 useCallback으로 최적화하여, 불필요한 함수 재생성을 방지하고 하위 컴포넌트에 전달되는 함수 참조가 유지되도록 했습니다.
