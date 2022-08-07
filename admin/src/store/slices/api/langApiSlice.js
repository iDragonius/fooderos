import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        languages: builder.query({
            query: () => ({
                url: '/lang',
            }),
        }),
    }),
})

export const { useLanguagesQuery } = authApiSlice
