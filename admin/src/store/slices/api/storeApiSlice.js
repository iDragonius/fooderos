import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        stores: builder.query({
            query: (params) => ({
                url: `/store/list/${params.lang}/${params.rest}`,
            }),
            keepUnusedDataFor: 1,
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
        }),
        allTags: builder.query({
            query: (rest) => ({
                url: `/tag/list/${rest}`,
            }),
        }),
        createStore: builder.mutation({
            async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
                console.log(data.tags)
                // upload with multipart/form-data
                const formData = new FormData()
                let tagForm = ''
                for (let i = 0; i < data.tags.length; i++) {
                    tagForm = tagForm + ' ' + data.tags[i].label
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
    }),
})

export const {
    useManagersQuery,
    useCreateStoreMutation,
    useStoresQuery,
    useShowStoreQuery,
    useAllTagsQuery,
} = authApiSlice
