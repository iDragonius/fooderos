import { apiSlice } from './apiSlice'

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        productTypes: builder.query({
            query: () => ({
                url: '/product/types',
            }),
        }),
        showProducts: builder.query({
            query: (params) => ({
                url: `/product/show/${params.lang}/${params.rest}`,
            }),
        }),
        showProduct: builder.query({
            query: (id) => ({
                url: `/product/show/${id}`,
            }),
        }),
        testProduct: builder.query({
            query: () => ({
                url: '/test/product',
            }),
        }),
        testVariants: builder.query({
            query: (id) => ({
                url: '/test/variants/' + id,
            }),
        }),
        st1: builder.mutation({
            query: (credentials) => ({
                url: '/test/st1',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        st2: builder.mutation({
            query: (credentials) => ({
                url: '/test/st2',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        productOptions: builder.mutation({
            query: (credentials) => ({
                url: '/options',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        productVariants: builder.mutation({
            async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
                const formData = new FormData()

                console.log(...formData)
                const response = await fetchWithBQ(
                    {
                        url: '/variants',
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
        productAddons: builder.mutation({
            query: (credentials) => ({
                url: '/addons',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        deleteProduct: builder.mutation({
            query: (credentials) => ({
                url: '/product',
                method: 'DELETE',
                body: { ...credentials },
            }),
        }),
        productStatus: builder.mutation({
            query: (credentials) => ({
                url: `/product/status`,
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        createProduct: builder.mutation({
            async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
                console.log(data)
                const formData = new FormData()

                formData.append('name', data.Az_name)
                formData.append('description', data.Az_description)
                formData.append('image', data.image)
                formData.append('sku', data.sku)
                formData.append('barcode', data.barcode)
                formData.append('position_id', data.positionId)
                formData.append('price', data.price)
                formData.append(
                    'isVariant',
                    data.isVariants ? data.isVariants : 0
                )
                formData.append('isAddons', data.isAddons ? data.isAddons : 0)
                formData.append('isGroup', 1)
                formData.append('weight', data.weight)
                data.haveStore === 1 && formData.append('store', data.store_id)

                formData.append('rest', data.rest)
                formData.append('manager', data.manager)
                data.langs.map((lang) => {
                    formData.append(`${lang}_name`, data[`${lang}_name`])
                    formData.append(
                        `${lang}_description`,
                        data[`${lang}_description`]
                    )
                })
                console.log(...formData)
                const response = await fetchWithBQ(
                    {
                        url: '/product',
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
        createVariants: builder.mutation({
            async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
                console.log(data)
                const formData = new FormData()
                formData.append('test', JSON.stringify(data.data))
                Object.keys(data.images).map((img) => {
                    formData.append(img, data.images[img])
                })
                formData.append('product_id', data.id)
                const response = await fetchWithBQ(
                    {
                        url: '/product/variants',
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
    useProductTypesQuery,
    useProductVariantsMutation,
    useTestProductQuery,
    useTestVariantsQuery,
    useSt1Mutation,
    useSt2Mutation,
    useProductOptionsMutation,
    useCreateProductMutation,
    useCreateVariantsMutation,
    useProductAddonsMutation,
    useShowProductsQuery,
    useDeleteProductMutation,
    useProductStatusMutation,
    useProductShowQuery,
} = productApiSlice
