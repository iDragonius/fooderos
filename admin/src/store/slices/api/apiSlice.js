import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://192.168.202.52:81/api',

    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        headers.set('applicationkey', '210cf7aa5e2682c9c9d4511f88fe2789')
        return headers
    },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const name = api.getState().auth.name
            api.dispatch(setCredentials({ ...refreshResult.data, name }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['TagType', 'Tag', 'Lang'],
    endpoints: (builder) => ({}),
})
