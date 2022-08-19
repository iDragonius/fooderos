import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const storeSlice = createSlice({
    name: 'tag',
    initialState: {
        manager: [],
        languages: [],
        language: 'Az',
        storeName: {},
        status: false,
    },
    reducers: {
        setManagers: (state, action) => {
            state.manager.push(action.payload)
        },
        deleteData: (state) => {
            state.language = 'Az'
            state.storeName = []
        },
        checkStoreData: (state) => {
            for (let i = 0; i < state.languages.length; i++) {
                if (!state.storeName[`${state.languages[i]}_name`]) {
                    state.storeName[`${state.languages[i]}_name`] =
                        state.storeName[`${state.languages[0]}_name`]
                }
            }
            state.status = true
        },
        changeLanguage: (state, action) => {
            state.language = action.payload
        },
        setData: (state, action) => {
            const { name } = action.payload
            state.storeName[`${state.language}_name`] = name
        },
        destroyStatus: (state) => {
            state.status = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                apiSlice.endpoints.managers.matchFulfilled,
                (state, { payload }) => {
                    state.manager = [...payload]
                }
            )
            .addMatcher(
                apiSlice.endpoints.languages.matchFulfilled,
                (state, { payload }) => {
                    for (let i = 0; i < payload.length; i++) {
                        state.languages.push(payload[i].lang)
                    }
                }
            )
    },
})

export const {
    setManagers,
    checkStoreData,
    deleteData,
    setData,
    changeLanguage,
    destroyStatus,
} = storeSlice.actions

export default storeSlice.reducer
export const currManagers = (state) => state.store.manager

export const currLang = (state) => state.store.language
export const currStoreNames = (state) => state.store.storeName
export const currStoreStatus = (state) => state.store.status
export const allLangs = (state) => state.store.languages
