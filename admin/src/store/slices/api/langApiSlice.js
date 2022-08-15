import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        languages: builder.query({
            query: () => ({
                url: '/lang',
            }),
        }),
        createLanguage: builder.mutation({
            query: (credentials) => ({
                url: '/lang',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
    }),
})

export const { useLanguagesQuery, useCreateLanguageMutation } = authApiSlice
