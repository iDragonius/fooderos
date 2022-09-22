import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const branchCatalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        data: [],
        languages: [],
        language: 'Az',
        status: false,
        storeId: 1,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                apiSlice.endpoints.languages.matchFulfilled,
                (state, { payload }) => {
                    for (let i = 0; i < payload.length; i++) {
                        state.languages.push(payload[i].lang)
                    }
                }
            )
            .addMatcher(
                apiSlice.endpoints.catalogs.matchFulfilled,
                (state, { payload }) => {
                    console.log(payload)
                }
            )
    },
})

export const {} = branchCatalogSlice.actions

export default branchCatalogSlice.reducer
export const currLang = (state) => state.branchCatalog.language
export const branchCatalogStatus = (state) => state.branchCatalog.status
export const branchCatalogData = (state) => state.branchCatalog.data
