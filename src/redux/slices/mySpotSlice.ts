import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MySpotState } from '../../types/states.ts';
import {
    fetchMySpotService,
    updateMySpotService,
} from '../../api/service/mySpotService.ts';

/* 초기 상태 */
const initialState: MySpotState = {
    id: 'user',
    parkingSpotId: null,
    status: null,
    loading: false,
    error: null,
};

/* 비동기 액션: 예약 상태 업데이트 */
export const updateMySpot = createAsyncThunk(
    'mySpot/update',
    async ({ id, parkingSpotId, status }: MySpotState) => {
        return await updateMySpotService({ id, parkingSpotId, status });
    }
);

/* 비동기 액션: 예약 상태 가져오기 */
export const fetchMySpot = createAsyncThunk(
    'mySpot/fetch',
    async (userId: string) => {
        return await fetchMySpotService(userId);
    }
);

/** Slice 정의 */
const mySpotSlice = createSlice({
    name: 'mySpot',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 예약 상태 업데이트
            .addCase(updateMySpot.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateMySpot.fulfilled,
                (state, action: PayloadAction<MySpotState>) => {
                    state.loading = false;
                    state.id = action.payload.id;
                    state.parkingSpotId = action.payload.parkingSpotId;
                    state.status = action.payload.status;
                }
            )
            .addCase(updateMySpot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || '예약 상태 업데이트 실패';
            })
            .addCase(fetchMySpot.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchMySpot.fulfilled,
                (state, action: PayloadAction<MySpotState>) => {
                    state.loading = false;
                    state.id = action.payload.id;
                    state.parkingSpotId = action.payload.parkingSpotId;
                    state.status = action.payload.status;
                }
            )
            .addCase(fetchMySpot.rejected, (state, action) => {
                state.loading = false;
                state.id = null; // 초기화 실패 시 상태를 기본값으로 설정
                state.parkingSpotId = null;
                state.status = null;
                state.error = action.error.message || '예약 상태 초기화 실패';
            });
    },
});

export default mySpotSlice.reducer;
