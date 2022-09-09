import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import AuthSlice from './slices/authSlice'
import { apiSlice } from './slices/api/apiSlice'
import UserInfoSlice from './slices/userInfoSlice'
import languageSlice from './slices/languageSlice'
import tagSlice from './slices/tagSlice'
import storeSlice from './slices/storeSlice'
import branchListSlice from './slices/branchListSlice'
import catalogSlice from './slices/catalogSlice'
import productSlice from './slices/productSlice'
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: AuthSlice,
        user: UserInfoSlice,
        tagData: languageSlice,
        tags: tagSlice,
        store: storeSlice,
        branchList: branchListSlice,
        catalog: catalogSlice,
        product: productSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})
