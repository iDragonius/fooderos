import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name: null,
        token: localStorage.getItem('token'),
        visitorToken: null,
        authorized: false,
        skip: false,
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

        setAuth: (state, action) => {
            state.authorized = action.payload
        },
        logOut: (state) => {
            state.name = null
            state.token = null
        },
        setSkip: (state, action) => {
            state.skip = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            apiSlice.endpoints.getProfile.matchFulfilled,
            (state, { payload }) => {
                state.authorized = true
            },
            apiSlice.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token
            },
            apiSlice.endpoints.getProfile.matchRejected,
            (state, { payload }) => {
                state.authorized = false
                state.token = ''
                localStorage.removeItem('token')
            }
        )
    },
})

export const { setCredentials, logOut, setAuth, setVisitorToken, setSkip } =
    authSlice.actions

export default authSlice.reducer
export const isSkip = (state) => state.auth.skip
export const isAuthorized = (state) => state.auth.authorized
export const selectCurrentName = (state) => state.auth.name
export const selectCurrentToken = (state) => state.auth.token
export const visitorToken = (state) => state.auth.visitorToken
