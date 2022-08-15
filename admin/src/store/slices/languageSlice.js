import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const languageSlice = createSlice({
    name: 'lang',
    initialState: {
        languages: [],
        language: 'Az',
        tagName: {},
        tagType: 'Market',
        description: {},
        status: false,
        id: null,
        image: null,
        change: 1,
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
        },
        destroyStatus: (state) => {
            state.status = false
        },
        setId: (state, action) => {
            state.id = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                apiSlice.endpoints.languages.matchFulfilled,
                (state, { payload }) => {
                    for (let i = 0; i < payload.length; i++) {
                        state.languages.push(payload[i].lang)
                    }
                }
            )
            .addMatcher(
                apiSlice.endpoints.showTag.matchFulfilled,
                (state, { payload }) => {
                    state.tagName = {}
                    state.description = {}
                    state.tagType = null
                    state.image = null
                    const data = payload[0]
                    state.image = data.image
                    for (let i = 0; i < data.tag_locals.length; i++) {
                        state.tagName[`${data.tag_locals[i].lang}_name`] =
                            data.tag_locals[i].name
                        state.description[`${data.tag_locals[i].lang}_desc`] =
                            data.tag_locals[i].description
                    }
                    state.change = state.change + 1
                }
            )
    },
})

export const {
    setData,
    changeLanguage,
    deleteData,
    checkData,
    destroyStatus,
    setId,
} = languageSlice.actions

export default languageSlice.reducer
export const currLanguage = (state) => state.tagData.language
export const tags = (state) => state.tagData.tagName
export const descs = (state) => state.tagData.description
export const allLangs = (state) => state.tagData.languages
export const tagType = (state) => state.tagData.tagType
export const checkStatus = (state) => state.tagData.status
export const currentId = (state) => state.tagData.id
export const currImage = (state) => state.tagData.image
export const changeId = (state) => state.tagData.change
