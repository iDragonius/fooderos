import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const branchSliceList = createSlice({
    name: 'tag',
    initialState: { stores: [], currentStore: null, currentStoreId: null },
    reducers: {
        setCurrent: (state, action) => {
            const { name, id } = action.payload
            state.currentStore = name
            state.currentStoreId = id
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            apiSlice.endpoints.branchStores.matchFulfilled,
            (state, { payload }) => {
                state.stores = [...payload]
            }
        )
    },
})

export const { setCurrent } = branchSliceList.actions

export default branchSliceList.reducer
export const allStores = (state) => state.branchList.stores
export const currBranchName = (state) => state.branchList.currentStore
