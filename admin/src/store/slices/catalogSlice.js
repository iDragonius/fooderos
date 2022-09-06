import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const catalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        data: [],
        names: {},
        languages: [],
        language: 'Az',
        status: false,
        storeId: 1,
        currCatalog: {},
    },
    reducers: {
        setNames: (state, action) => {
            const { name } = action.payload
            state.names[`${state.language}_name`] = name
        },
        changeLanguage: (state, action) => {
            state.language = action.payload
        },
        deleteData: (state) => {
            state.names = {}
            state.language = 'Az'
        },
        checkCatalogData: (state) => {
            for (let i = 0; i < state.languages.length; i++) {
                if (!state.names[`${state.languages[i]}_name`]) {
                    state.names[`${state.languages[i]}_name`] =
                        state.names[`${state.languages[0]}_name`]
                }
            }
            state.status = true
        },
        destroyStatus: (state) => {
            state.status = false
        },
        changeStore: (state, action) => {
            state.storeId = action.payload
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
                apiSlice.endpoints.catalogs.matchFulfilled,
                (state, { payload }) => {
                    const data = JSON.parse(JSON.stringify(payload))
                    for (let i = 0; i < payload.length; i++) {
                        let sub = true
                        data[i].name = data[i].locals[0].name
                        data[i].store_name = data[i].store[0]
                            ? data[i].store[0].name
                            : 'General'

                        let tree = data[i].sub
                        while (sub) {
                            if (tree) {
                                for (let k = 0; k < tree.length; k++) {
                                    tree[k].name = tree[k].locals[0]
                                        ? tree[k].locals[0].name
                                        : 'asd'
                                    tree[k].store_name = tree[k].store[0]
                                        ? tree[k].store[0].name
                                        : ''
                                    for (
                                        let j = 0;
                                        j < tree[k].sub.length;
                                        j++
                                    ) {
                                        tree[k].sub[j].name = tree[k].sub[j]
                                            .locals[0]
                                            ? tree[k].sub[j].locals[0].name
                                            : 'asd'
                                        tree[k].sub[j].store_name = tree[k]
                                            .store[0]
                                            ? tree[k].sub[j].store[0].name
                                            : ''
                                    }
                                }

                                tree = tree.sub || null
                            } else {
                                sub = false
                            }
                        }
                        sub = true
                    }

                    state.data = [...data]
                }
            )
            .addMatcher(
                apiSlice.endpoints.catalog.matchFulfilled,
                (state, { payload }) => {
                    console.log(payload)
                    state.currCatalog.type =
                        payload.ParentCatagory === 0
                            ? 'General'
                            : payload.ParentCatagory
                    state.currCatalog.store = payload.store[0]
                        ? payload.store[0].name
                        : null
                    state.currCatalog.image = payload.catagory.image
                    payload.catagory.locals.map((local) => {
                        state.names[`${local.lang}_name`] = local.name
                    })
                }
            )
    },
})

export const {
    setNames,
    changeLanguage,
    deleteData,
    checkCatalogData,
    destroyStatus,
} = catalogSlice.actions

export default catalogSlice.reducer
export const currLang = (state) => state.catalog.language
export const currNames = (state) => state.catalog.names
export const catalogStatus = (state) => state.catalog.status
export const currStoreId = (state) => state.catalog.storeId
export const catalogData = (state) => state.catalog.data
export const currCatalogData = (state) => state.catalog.currCatalog
