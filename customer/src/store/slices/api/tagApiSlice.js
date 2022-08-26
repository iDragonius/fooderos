import { apiSlice } from './apiSlice'

export const tagApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        tags: builder.query({
            query: (type) => ({
                url: `/tag/list/En/${type}`,
            }),
            keepUnusedDataFor: 1,
        }),
    }),
})

export const { useTagsQuery } = tagApiSlice
