import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/phone/verfy',
                method: 'POST',
                body: { ...credentials },
            }),
            invalidatesTags: ['User'],
        }),
        phone: builder.mutation({
            query: (credentials) => ({
                url: '/phone',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        loginSc: builder.mutation({
            query: (credentials) => ({
                url: '/social/verify',
                method: 'POST',
                body: { ...credentials },
            }),
            invalidatesTags: ['User'],
        }),
        logOut: builder.mutation({
            query: (credentials) => ({
                url: '/logout',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useLoginScMutation,
    usePhoneMutation,
    useLogOutMutation,
} = authApiSlice
