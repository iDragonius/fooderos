import { apiSlice } from './apiSlice'
import { setCredentials } from '../authSlice'

export const branchCatalogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBranchCatalog: builder.mutation({
            query: (credentials) => ({
                url: '/branch/catalogs',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        editBranchCatalog: builder.mutation({
            query: (credentials) => ({
                url: '/branch/catalogs/edit',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        showBranchCatalogs: builder.query({
            query: (params) => ({
                url: `/branch/catalogs/show/${params.id}/${params.lang}`,
            }),
        }),
        branchCatalogStatus: builder.mutation({
            query: (credentials) => ({
                url: `/branch/catalogs/status`,
                method: 'POST',
                body: { ...credentials },
            }),
        }),
    }),
})

export const {
    useCreateBranchCatalogMutation,
    useShowBranchCatalogsQuery,
    useEditBranchCatalogMutation,
    useBranchCatalogStatusMutation,
} = branchCatalogApiSlice
