import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        stores: builder.query({
            query: (params) => ({
                url: `/store/list/${params.lang}/${params.rest}`,
            }),
            keepUnusedDataFor: 1,
            providesTags: ['Store'],
        }),
        managers: builder.query({
            query: () => ({
                url: '/store/manager',
            }),
        }),
        showStore: builder.query({
            query: (id) => ({
                url: `/store/show/${id}`,
            }),
            keepUnusedDataFor: 1,
        }),
        allTags: builder.query({
            query: (rest) => ({
                url: `/tag/list/${rest}`,
            }),
        }),
        storeStatus: builder.mutation({
            query: (credentials) => ({
                url: `/store/status`,
                method: 'POST',
                body: { ...credentials },
            }),
            invalidatesTags: ['Store'],
        }),
        deleteStore: builder.mutation({
            query: (credentials) => ({
                url: `/store`,
                method: 'DELETE',
                body: { ...credentials },
            }),
            invalidatesTags: ['Store'],
        }),
        createStore: builder.mutation({
            async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
                console.log(data.tags)
                const formData = new FormData()
                let tagForm = ''
                console.log(data.tags)
                for (let i = 0; i < data.tags.length; i++) {
                    tagForm = tagForm + ' ' + data.tags[i]
                }
                for (let i = 0; i < data.langs.length; i++) {
                    formData.append(
                        `${data.langs[i]}_name`,
                        data[`${data.langs[i]}_name`]
                    )
                }
                formData.append('manager', data.manager)
                formData.append('name', data.name)
                formData.append('image', data.image)
                formData.append('type', data.type)
                formData.append('tags', tagForm.trim())
                formData.append('commission', data.commission)
                formData.append('price', data.price)

                const response = await fetchWithBQ(
                    {
                        url: '/store',
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
        editStore: builder.mutation({
            async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
                const formData = new FormData()
                let tagForm = ''
                for (let i = 0; i < data.tags.length; i++) {
                    tagForm = tagForm + ' ' + data.tags[i]
                }
                for (let i = 0; i < data.langs.length; i++) {
                    formData.append(
                        `${data.langs[i]}_name`,
                        data[`${data.langs[i]}_name`]
                    )
                }
                formData.append('id', data.id)
                formData.append('manager', data.manager)
                formData.append('name', data.name)
                formData.append('image', data.image)
                formData.append('type', data.type)
                formData.append('tags', tagForm.trim())
                formData.append('commission', data.commission)
                formData.append('price', data.price)

                const response = await fetchWithBQ(
                    {
                        url: '/store/edit',
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
    useManagersQuery,
    useCreateStoreMutation,
    useStoresQuery,
    useShowStoreQuery,
    useAllTagsQuery,
    useStoreStatusMutation,
    useEditStoreMutation,
    useDeleteStoreMutation,
} = authApiSlice
