import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const tagSlice = createSlice({
    name: 'tag',
    initialState: { data: [] },
    reducers: {
        setData: (state, action) => {
            state.data.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            apiSlice.endpoints.tags.matchFulfilled,
            (state, { payload }) => {
                state.data = [...payload.Tags]
            }
        )
    },
})

export const { setData } = tagSlice.actions

export default tagSlice.reducer
export const currData = (state) => state.tags.data
