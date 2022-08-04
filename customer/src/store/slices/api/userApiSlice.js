import { apiSlice } from './apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => '/user',
            keepUnusedDataFor: 5,
        }),
        user: builder.mutation({
            query: (credentials) => ({
                url: '/user',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
    }),
})

export const { useGetUserQuery, useUserMutation } = usersApiSlice
