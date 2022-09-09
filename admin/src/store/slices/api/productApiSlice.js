import { apiSlice } from './apiSlice'

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        productTypes: builder.query({
            query: () => ({
                url: '/product/types',
            }),
        }),
        productCreate: builder.mutation({
            async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
                console.log(data.tags)
                const formData = new FormData()

                formData.append('name', data.name)
                formData.append('description', data.description)
                formData.append('image', data.image)
                formData.append('sku', data.sku)
                formData.append('barcode', data.barcode)
                formData.append('position_id', data.positionId)
                formData.append('price', data.unitPrice)
                formData.append('isVariant', data.isVariant)
                formData.append('isAddons', data.isAddons)

                formData.append('weight', data.weight)
                data.store && formData.append('store_id', data.store)
                formData.append('Az_name', data.name)
                formData.append('En_name', data.name)
                formData.append('rest', data.rest)
                formData.append('manager', data.vendor)

                formData.append('Ru_name', data.name)
                formData.append('Az_description', data.description)
                formData.append('En_description', data.description)
                formData.append('Ru_description', data.description)
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
    }),
})

export const { useProductTypesQuery, useProductCreateMutation } =
    productApiSlice
