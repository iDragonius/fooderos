import { apiSlice } from './apiSlice'

export const branchApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        branchStores: builder.query({
            query: () => ({
                url: '/branch/stores',
            }),
        }),
        countries: builder.query({
            query: () => ({
                url: '/country',
            }),
        }),
        payment: builder.query({
            query: () => ({
                url: '/settings/paymentoptions',
            }),
        }),
        cities: builder.query({
            query: (country) => ({
                url: `/city/${country}`,
            }),
            keepUnusedDataFor: 1,
        }),
    }),
})

export const {
    useBranchStoresQuery,
    useCountriesQuery,
    useCitiesQuery,
    usePaymentQuery,
} = branchApiSlice
