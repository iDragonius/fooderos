import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        languages: builder.query({
            query: () => ({
                url: '/lang',
            }),
            providesTags: ['Lang'],
        }),
        createLanguage: builder.mutation({
            query: (credentials) => ({
                url: '/lang',
                method: 'POST',
                body: { ...credentials },
            }),
            invalidatesTags: ['Lang'],
        }),
        deleteLanguage: builder.mutation({
            query: (credentials) => ({
                url: '/lang',
                method: 'DELETE',
                body: { ...credentials },
            }),
            providesTags: ['Lang'],
        }),
    }),
})

export const {
    useLanguagesQuery,
    useCreateLanguageMutation,
    useDeleteLanguageMutation,
} = authApiSlice
