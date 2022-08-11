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
            providesTags: ['Tag'],
        }),
        createType: builder.mutation({
            query: (credentials) => ({
                url: '/tag/type',
                method: 'POST',
                body: { ...credentials },
            }),
            invalidatesTags: ['Tag'],
        }),

        status: builder.mutation({
            query: (credentials) => ({
                url: '/tag/status',
                method: 'PUT',
                body: { ...credentials },
            }),
        }),
        createTag: builder.mutation({
            async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
                console.log(data)
                // upload with multipart/form-data
                const formData = new FormData()
                for (let i = 0; i < data.langs.length; i++) {
                    formData.append(
                        `${data.langs[i]}_name`,
                        data[`${data.langs[i]}_name`]
                    )
                    formData.append(
                        `${data.langs[i]}_desc`,
                        data[`${data.langs[i]}_desc`]
                    )
                }
                formData.append('tag_name', data.tagName)
                formData.append('name', data.name)
                formData.append('image', data.image)
                const response = await fetchWithBQ(
                    {
                        url: '/tag/create',
                        method: 'POST',
                        body: formData,
                    },
                    _queryApi,
                    _extraOptions
                )
                if (response.error) throw response.error
                return response.data
                    ? { data: response.data }
                    : { error: response.error }
            },
        }),
    }),
})

export const {
    useTagsQuery,
    useTagTypeQuery,
    useStatusMutation,
    useCreateTagMutation,
    useCreateTypeMutation,
} = authApiSlice
