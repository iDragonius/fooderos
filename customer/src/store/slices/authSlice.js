import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name: null,
        token: localStorage.getItem('token'),
        visitorToken: null,
        scProvider: null,
        authorized: false,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { name, token } = action.payload
            state.name = name ? name : state.name
            state.token = token ? token : state.token
        },
        setVisitorToken: (state, action) => {
            state.visitorToken = action.payload
        },
        setScProvider: (state, action) => {
            state.scProvider = action.payload
        },
        setAuth: (state, action) => {
            state.authorized = action.payload
        },
        logOut: (state) => {
            state.name = null
            state.token = null
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            apiSlice.endpoints.getProfile.matchFulfilled,
            (state, { payload }) => {
                state.authorized = true
            }
        )
    },
})

export const {
    setCredentials,
    logOut,
    setAuth,
    setVisitorToken,
    setScProvider,
} = authSlice.actions

export default authSlice.reducer
export const isAuthorized = (state) => state.auth.authorized
export const selectCurrentName = (state) => state.auth.name
export const selectCurrentToken = (state) => state.auth.token
export const visitorToken = (state) => state.auth.visitorToken
export const scProvider = (state) => state.auth.scProvider
