import { apiSlice } from './apiSlice'

export const branchApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        catalogTypes: builder.query({
            query: (params) => ({
                url: `/catagory/list/${params.lang}/${params.rest}`,
            }),
        }),
        catalogs: builder.query({
            query: (params) => ({
                url: `/catagory/show/${params.lang}/${params.rest}`,
            }),
            providesTags: ['Catalog'],
        }),
        catalog: builder.query({
            query: (params) => ({
                url: `/catagory/shows/${params.id}/${params.lang}`,
            }),
        }),
        catalogStatus: builder.mutation({
            query: (credentials) => ({
                url: `/catagory/status`,
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        deleteCatalog: builder.mutation({
            query: (credentials) => ({
                url: `/catagory`,
                method: 'DELETE',
                body: { ...credentials },
            }),
            invalidatesTags: ['Catalog'],
        }),
        createCatalog: builder.mutation({
            async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
                // upload with multipart/form-data
                console.log(data)
                const formData = new FormData()
                for (let i = 0; i < data.langs.length; i++) {
                    formData.append(
                        `${data.langs[i]}_name`,
                        data[`${data.langs[i]}_name`]
                    )
                }
                data.type === 'General'
                    ? formData.append('catagory_sub', '0')
                    : formData.append('catagory_sub', data.type)

                formData.append('name', data.name)
                formData.append('image', data.image)
                formData.append('rest', data.rest)
                data.unique && formData.append('store', data.store)
                const response = await fetchWithBQ(
                    {
                        url: '/catagory',
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
            invalidatesTags: ['Catalog'],
        }),
        editCatalog: builder.mutation({
            async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
                // upload with multipart/form-data
                const formData = new FormData()
                for (let i = 0; i < data.langs.length; i++) {
                    formData.append(
                        `${data.langs[i]}_name`,
                        data[`${data.langs[i]}_name`]
                    )
                }
                data.type === 'General'
                    ? formData.append('catagory_sub', '0')
                    : formData.append('catagory_sub', data.type)

                formData.append('name', data.name)
                formData.append('image', data.image)
                formData.append('rest', data.rest)
                formData.append('id', data.id)
                data.unique && formData.append('store', data.store)
                const response = await fetchWithBQ(
                    {
                        url: '/catagory/edit',
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
            invalidatesTags: ['Catalog'],
        }),
    }),
})

export const {
    useCatalogTypesQuery,
    useCreateCatalogMutation,
    useCatalogsQuery,
    useDeleteCatalogMutation,
    useCatalogStatusMutation,
    useCatalogQuery,
    useEditCatalogMutation,
} = branchApiSlice
