import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        tags: builder.query({
            query: () => ({
                url: '/tag/list',
            }),
        }),
        tagType: builder.query({
            query: () => ({
                url: '/tag/type',
            }),
        }),
        status: builder.mutation({
            query: (credentials) => ({
                url: '/tag/status',
                method: 'PUT',
                body: { ...credentials },
            }),
        }),
    }),
})

export const { useTagsQuery, useTagTypeQuery, useStatusMutation } = authApiSlice
