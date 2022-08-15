import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import AuthSlice from './slices/authSlice'
import { apiSlice } from './slices/api/apiSlice'
import UserInfoSlice from './slices/userInfoSlice'
import languageSlice from './slices/languageSlice'
import tagSlice from './slices/tagSlice'
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: AuthSlice,
        user: UserInfoSlice,
        tagData: languageSlice,
        tags: tagSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})
