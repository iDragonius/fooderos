import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const storeSlice = createSlice({
    name: 'tag',
    initialState: {
        manager: [],
        languages: [],
        language: 'Az',
        lastLanguage: 'Az',
        storeName: {},
        status: false,
        data: [],
        tags: [],
        selectedTags: [],
        currentTags: [],
        currStore: {},
    },
    reducers: {
        setManagers: (state, action) => {
            state.manager.push(action.payload)
        },
        deleteData: (state) => {
            state.language = 'Az'
            state.storeName = []
            state.lastLanguage = 'Az'
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
        setNames: (state, action) => {
            const { name } = action.payload
            state.storeName[`${state.language}_name`] = name
        },
        setLastLanguage: (state, action) => {
            state.lastLanguage = action.payload
        },
        setSelectedTag: (state, action) => {
            state.selectedTags = []
            state.selectedTagsNumbers = []
            state.currentTags = []
            for (let i = 0; i < action.payload.length; i++) {
                for (let k = 0; k < state.tags.length; k++) {
                    if (
                        action.payload[i].label ===
                        state.tags[k][state.lastLanguage]
                    ) {
                        state.selectedTags.push(state.tags[k]['Az'])
                        state.currentTags.push({
                            label: state.tags[k][state.language],
                            value: state.tags[k][state.language],
                        })
                    }
                }
            }
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
            .addMatcher(
                apiSlice.endpoints.stores.matchFulfilled,
                (state, { payload }) => {
                    state.data = []
                    const store =
                        payload.restaurants ||
                        payload.grocery ||
                        payload.pastries
                    for (let i = 0; i < store.length; i++) {
                        let tagsStr = ''
                        for (let j = 0; j < store[i].tags.length; j++) {
                            tagsStr =
                                tagsStr + ', ' + store[i].tags[j].tag[0].name
                        }
                        console.log(store)

                        state.data.push({
                            id: store[i].id,
                            name: store[i].store_locals[0].name,
                            image: store[i].image,
                            tags: tagsStr.slice(1),
                            status: store[i].status,
                        })
                    }
                }
            )
            .addMatcher(
                apiSlice.endpoints.showStore.matchFulfilled,
                (state, { payload }) => {
                    let tags = []
                    let names = {}
                    for (let i = 0; i < payload.tags.length; i++) {
                        for (let j = 0; j < payload.tags[i].tags.length; j++) {
                            if (payload.tags[i].tags[j].lang === 'Az') {
                                state.selectedTags.push(
                                    payload.tags[i].tags[j].name
                                )
                                state.currentTags.push({
                                    label: payload.tags[i].tags[j].name,
                                    value: payload.tags[i].tags[j].name,
                                })
                            }
                        }
                    }
                    for (let i = 0; i < payload.store_locales.length; i++) {
                        state.storeName[
                            `${payload.store_locales[i].lang}_name`
                        ] = payload.store_locales[i].name
                    }

                    state.currStore = {
                        manager: payload.manager,
                        price: Number(payload.store_data.price),
                        image: payload.store_data.image,
                        commission: payload.store_data.commission,
                        names,
                    }
                }
            )
            .addMatcher(
                apiSlice.endpoints.allTags.matchFulfilled,
                (state, { payload }) => {
                    state.tags = []
                    for (let i = 0; i < payload.length; i++) {
                        let temp = {}
                        for (let j = 0; j < state.languages.length; j++) {
                            temp[`${payload[i].tag_locals[j].lang}`] =
                                payload[i].tag_locals[j].name
                        }
                        state.tags.push(temp)
                    }
                }
            )
    },
})

export const {
    setManagers,
    checkStoreData,
    deleteData,
    setNames,
    changeLanguage,
    destroyStatus,
    setSelectedTag,
    setLastLanguage,
} = storeSlice.actions

export default storeSlice.reducer
export const currManagers = (state) => state.store.manager

export const currLang = (state) => state.store.language
export const currStoreNames = (state) => state.store.storeName
export const currStoreStatus = (state) => state.store.status
export const allLangs = (state) => state.store.languages
export const currData = (state) => state.store.data
export const currStore = (state) => state.store.currStore
export const allTags = (state) => state.store.tags
export const currTags = (state) => state.store.currentTags
export const currSeleetedTags = (state) => state.store.selectedTags
