import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        visitor: builder.mutation({
            query:(credentials)=> ({
                url:'/visitor',
                method:'POST',
                body:{...credentials}
            })
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

} = authApiSlice
