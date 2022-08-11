import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const languageSlice = createSlice({
    name: 'lang',
    initialState: {
        currSection: 'newTagType',
        languages: [],
        language: 'Az',
        tagName: {},
        tagType: 'Market',
        description: {},
        status: false,
    },
    reducers: {
        setData: (state, action) => {
            const { tag, type, desc } = action.payload
            state.tagName[`${state.language}_name`] = tag
            state.tagType = type
            state.description[`${state.language}_desc`] = desc
        },
        changeLanguage: (state, action) => {
            state.language = action.payload
        },
        deleteData: (state) => {
            state.tagType = null
            state.tagName = {}
            state.description = {}
            state.language = 'Az'
        },
        checkData: (state) => {
            for (let i = 0; i < state.languages.length; i++) {
                if (!state.tagName[`${state.languages[i]}_name`]) {
                    state.tagName[`${state.languages[i]}_name`] =
                        state.tagName[`${state.languages[0]}_name`]
                    state.description[`${state.languages[i]}_desc`] =
                        state.description[`${state.languages[0]}_desc`]
                }
            }
            state.status = true
            state.tagType = 'Market'
        },
        destroyStatus: (state) => {
            state.status = false
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            apiSlice.endpoints.languages.matchFulfilled,
            (state, { payload }) => {
                for (let i = 0; i < payload.length; i++) {
                    console.log(payload[i].lang)
                    state.languages.push(payload[i].lang)
                }
            }
        )
    },
})

export const { setData, changeLanguage, deleteData, checkData, destroyStatus } =
    languageSlice.actions

export default languageSlice.reducer
export const currLanguage = (state) => state.lang.language
export const tags = (state) => state.lang.tagName
export const descs = (state) => state.lang.description
export const allLangs = (state) => state.lang.languages
export const tagType = (state) => state.lang.tagType
export const checkStatus = (state) => state.lang.status
