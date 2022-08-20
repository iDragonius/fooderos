import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const userInfoSlice = createSlice({
    name: 'user',
    initialState: {
        name: null,
        createdAt: null,
        image: null,
        language: localStorage.getItem('lang'),
    },
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
        setLanguage: (state, action) => {
            state.language = action.payload
        },
        deleteData: (state) => {
            state.name = null
            state.image = null
            state.createdAt = null
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

export const {
    setData,
    setName,
    setCreated,
    setImage,
    setLanguage,
    deleteData,
} = userInfoSlice.actions

export default userInfoSlice.reducer
export const currName = (state) => state.user.name
export const currCreatedAt = (state) => state.user.createdAt
export const avatar = (state) => state.user.image
export const currLanguage = (state) => state.user.language
