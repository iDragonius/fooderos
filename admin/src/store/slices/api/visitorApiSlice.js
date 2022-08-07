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

    }),
})

export const {
    useVisitorMutation
} = authApiSlice
