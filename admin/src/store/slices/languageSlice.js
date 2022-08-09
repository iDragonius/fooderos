import { createSlice } from '@reduxjs/toolkit'
import languages from '../../pages/tagList/languages/Languages'

const languageSlice = createSlice({
    name: 'lang',
    initialState: {
        currSection: 'new',
        languages: ['Az', 'En', 'Ru'],
        language: 'Az',
        tagName: {},
        tagType: null,
        description: {},
    },
    reducers: {
        setData: (state, action) => {
            const { tag, type, desc } = action.payload
            state.tagName[state.language] = tag
            state.tagType = type
            state.description[state.language] = desc
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
                console.log(1)
                if (!state.tagName[state.languages[i]]) {
                    state.tagName[state.languages[i]] =
                        state.tagName[state.languages[0]]
                }
            }
        },
    },
})

export const { setData, changeLanguage, deleteData, checkData } =
    languageSlice.actions

export default languageSlice.reducer
export const currLanguage = (state) => state.lang.language
export const tags = (state) => state.lang.tagName
