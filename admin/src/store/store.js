import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import AuthSlice from './slices/authSlice'
import { apiSlice } from './slices/api/apiSlice'
import UserInfoSlice from './slices/userInfoSlice'
import languageSlice from './slices/languageSlice'
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: AuthSlice,
        user: UserInfoSlice,
        lang: languageSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})
