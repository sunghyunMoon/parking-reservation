import { configureStore, AnyAction } from '@reduxjs/toolkit';
import mySpotReducer from './slices/mySpotSlice.ts';
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { parkingSpotsApi } from './apis/parkingSpotsApi.ts';

const store = configureStore({
    reducer: {
        mySpot: mySpotReducer,
        [parkingSpotsApi.reducerPath]: parkingSpotsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(parkingSpotsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;

export default store;
