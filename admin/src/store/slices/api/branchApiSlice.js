import { apiSlice } from './apiSlice'

export const branchApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        branchStores: builder.query({
            query: () => ({
                url: '/branch/stores',
            }),
        }),
        branchStoreList: builder.query({
            query: (id) => ({
                url: `/branch/list/${id}`,
            }),
            providesTags: ['BranchList'],
        }),
        showBranch: builder.query({
            query: (id) => ({
                url: `/branch/show/${id}`,
            }),
        }),
        countries: builder.query({
            query: () => ({
                url: '/country',
            }),
        }),
        payment: builder.query({
            query: () => ({
                url: '/settings/paymentoptions',
            }),
        }),
        cities: builder.query({
            query: (country) => ({
                url: `/city/${country}`,
            }),
            keepUnusedDataFor: 1,
        }),
        branchStatus: builder.mutation({
            query: (credentials) => ({
                url: `/branch/status`,
                method: 'POST',
                body: { ...credentials },
            }),
            invalidatesTags: ['BranchList'],
        }),
        deleteBranch: builder.mutation({
            query: (credentials) => ({
                url: `/branch`,
                method: 'DELETE',
                body: { ...credentials },
            }),
            invalidatesTags: ['BranchList'],
        }),
        createBranch: builder.mutation({
            async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
                console.log(data)
                const formData = new FormData()
                const days = [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                ]
                let schedule = ''
                for (let i = 0; i < days.length; i++) {
                    let temp = data.schedule[days[i]].closed ? 1 : 0
                    schedule =
                        schedule +
                        data.schedule[days[i]].start +
                        ',' +
                        data.schedule[days[i]].end +
                        ',' +
                        temp +
                        ','
                }
                let currency = ''
                let payment = ''
                for (let i = 0; i < data.currency.length; i++) {
                    currency = currency + ',' + data.currency[i].value
                }
                for (let i = 0; i < data.payment.length; i++) {
                    console.log(data.payment[i].value)
                    payment = payment + ',' + data.payment[i].value
                }
                console.log(currency, payment)
                formData.append('schedule', schedule.slice(0, -1))
                formData.append('cover', data.cover)

                formData.append('profile', data.profile)
                formData.append('name', data.name)

                formData.append('address', data.address)
                for (let i = 0; i < data.languages.length; i++) {
                    formData.append(
                        `${data.languages[i]}_name`,
                        data[`${data.languages[i]}_name`]
                    )
                    formData.append(
                        `${data.languages[i]}_address`,
                        data[`${data.languages[i]}_address`]
                    )
                }

                formData.append('lat', data.lat)
                formData.append('long', data.lng)
                formData.append('amount', data.amount)
                formData.append('max_distance', data.max_distance)
                formData.append('cash_limit', data.cash_limit)
                formData.append('country', data.country)
                formData.append('city', data.city)
                formData.append('payload', data.payload)
                formData.append('payment', payment)
                formData.append('currency', currency)
                formData.append('store_id', data.store_id)
                formData.append('phone', data.phone)

                const response = await fetchWithBQ(
                    {
                        url: '/branch',
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
    useBranchStoresQuery,
    useCountriesQuery,
    useCitiesQuery,
    usePaymentQuery,
    useCreateBranchMutation,
    useBranchStoreListQuery,
    useBranchStatusMutation,
    useDeleteBranchMutation,
    useShowBranchQuery,
} = branchApiSlice
