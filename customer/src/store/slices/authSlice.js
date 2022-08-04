import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { name: null, token: null, authorized: false },
    reducers: {
        setCredentials: (state, action) => {
            const { name, token } = action.payload
            state.name = name ? name : state.name
            state.token = token ? token : state.token
        },
        setAuth: (state, action) => {
            state.authorized = action.payload
        },
        logOut: (state) => {
            state.name = null
            state.token = null
        },
    },
})

export const { setCredentials, logOut, setAuth } = authSlice.actions

export default authSlice.reducer
export const isAuthorized = (state) => state.auth.authorized
export const selectCurrentName = (state) => state.auth.name
export const selectCurrentToken = (state) => state.auth.token
