import { apiSlice } from './apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => '/user',
            keepUnusedDataFor: 5,
        }),
        user: builder.mutation({
            query: (credentials) => ({
                url: '/user',
                method: 'POST',
                body: { ...credentials },
            }),
        }),

        getProfile: builder.query({
            async queryFn(file, _queryApi, _extraOptions, fetchWithBQ) {
                if (!localStorage.getItem('token'))
                    return console.log('no token')
                const response = await fetchWithBQ(
                    {
                        url: '/profile/main',
                    },
                    _queryApi,
                    _extraOptions
                )
                if (response?.error) {
                    localStorage.removeItem('token')
                }
                return response.data
                    ? { data: response.data }
                    : { error: response.error }
            },
        }),
        updateProfile: builder.mutation({
            query: (credentials) => ({
                url: '/profile/update',
                method: 'PUT',
                body: { ...credentials },
            }),
        }),

        uploadFile: builder.mutation({
            async queryFn(file, _queryApi, _extraOptions, fetchWithBQ) {
                // upload with multipart/form-data
                const formData = new FormData()
                formData.append('image', file)
                const response = await fetchWithBQ(
                    {
                        url: '/profile/photo',
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
            invalidatesTags: ['User'],
        }),
    }),
})

export const {
    useGetUserQuery,
    useUserMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUploadFileMutation,
} = usersApiSlice
