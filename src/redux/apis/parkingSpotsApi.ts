import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ParkingSpot, ParkingSpotStatus } from '../../types/states';
import { BASE_URL } from '../../config/URL.ts';

export const parkingSpotsApi = createApi({
    reducerPath: 'parkingSpotsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['ParkingSpots'],
    endpoints: (builder) => ({
        fetchParkingSpots: builder.query<ParkingSpot[], void>({
            query: () => 'parkingSpots',
            providesTags: (result) =>
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
        fetchParkingSpotById: builder.query<ParkingSpot, string>({
            query: (id) => `parkingSpots/${id}`,
            providesTags: (result, error, id) => [{ type: 'ParkingSpots', id }],
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
            invalidatesTags: (result, error, { id }) => [
                { type: 'ParkingSpots', id },
            ],
        }),
    }),
});

export const {
    useFetchParkingSpotsQuery,
    useFetchParkingSpotByIdQuery,
    useUpdateParkingSpotMutation,
} = parkingSpotsApi;
