import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const userInfoSlice = createSlice({
    name: 'user',
    initialState: { name: null, createdAt: null, image: null },
    reducers: {
        setData: (state, action) => {
            const { createdAt, name } = action.payload
            state.createdAt = createdAt
            state.name = name
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setCreated: (state, action) => {
            state.createdAt = action.payload
        },
        setImage: (state, action) => {
            state.image = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            apiSlice.endpoints.getProfile.matchFulfilled,
            (state, { payload }) => {
                state.image = payload ? payload.photo : null
                state.name = payload ? payload.name : null
                state.createdAt = payload ? payload.created_at : null
            }
        )
    },
})

export const { setData, setName, setCreated, setImage } = userInfoSlice.actions

export default userInfoSlice.reducer
export const currName = (state) => state.user.name
export const currCreatedAt = (state) => state.user.createdAt
export const avatar = (state) => state.user.image
