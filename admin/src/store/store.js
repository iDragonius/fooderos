import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import AuthSlice from './slices/authSlice'
import { apiSlice } from './slices/api/apiSlice'
import UserInfoSlice from './slices/userInfoSlice'
import languageSlice from './slices/languageSlice'
import tagSlice from './slices/tagSlice'
import storeSlice from './slices/storeSlice'
import branchListSlice from './slices/branchListSlice'
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: AuthSlice,
        user: UserInfoSlice,
        tagData: languageSlice,
        tags: tagSlice,
        store: storeSlice,
        branchList: branchListSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})
