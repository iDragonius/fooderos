import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        tags: builder.query({
            query: () => ({
                url: '/tag/list',
            }),
            providesTags: ['Tag'],
        }),
        tagType: builder.query({
            query: () => ({
                url: '/tag/type',
            }),
            providesTags: ['TagType'],
        }),
        createType: builder.mutation({
            query: (credentials) => ({
                url: '/tag/type',
                method: 'POST',
                body: { ...credentials },
            }),
            invalidatesTags: ['TagType'],
        }),
        showTag: builder.query({
            query: (id) => ({
                url: `/tag/show/${id}`,
                keepUnusedDataFor: 5,
            }),
        }),
        status: builder.mutation({
            query: (credentials) => ({
                url: '/tag/status',
                method: 'PUT',
                body: { ...credentials },
            }),
        }),
        typeStatus: builder.mutation({
            query: (credentials) => ({
                url: '/tag/typestatus',
                method: 'PUT',
                body: { ...credentials },
            }),
        }),
        deleteTag: builder.mutation({
            query: (credentials) => ({
                url: '/tag/delete',
                method: 'DELETE',
                body: { ...credentials },
            }),
            invalidatesTags: ['Tag'],
        }),
        updateTag: builder.mutation({
            async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
                const formData = new FormData()
                for (let i = 0; i < data.langs.length; i++) {
                    formData.append(
                        `${data.langs[i]}_name`,
                        data[`${data.langs[i]}_name`]
                    )

                    formData.append(
                        `${data.langs[i]}_description`,
                        data[`${data.langs[i]}_desc`]
                    )
                }
                formData.append('tag_name', data.tagName)
                formData.append('name', data.name)
                formData.append('image', data.image)
                formData.append('id', data.id)
                for (let pair of formData.entries()) {
                    console.log(pair[0] + ', ' + pair[1])
                }
                const response = await fetchWithBQ(
                    {
                        url: '/tag/edit',
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
                        `${data.langs[i]}_description`,
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
            invalidatesTags: ['Tag'],
        }),
    }),
})

export const {
    useTagsQuery,
    useTagTypeQuery,
    useStatusMutation,
    useCreateTagMutation,
    useCreateTypeMutation,
    useTypeStatusMutation,
    useDeleteTagMutation,
    useShowTagQuery,
    useUpdateTagMutation,
} = authApiSlice
