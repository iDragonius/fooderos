import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const branchCatalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        data: [],
        list: [],
        languages: [],
        selectedCatalogs: [],
        language: 'Az',
        status: false,
        storeId: 1,
    },
    reducers: {
        setCatalogs: (state, action) => {
            state.selectedCatalogs = [...action.payload]
        },
        deleteData: (state) => {
            state.selectedCatalogs = []
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
                    state.data = []
                    const getData = (data) => {
                        const res = [
                            {
                                id: data.id,
                                name: data.locals[0].name,
                                image: data.image,
                                parent_id: data.catagory_id,
                                catagory_id: data.id,
                            },
                        ]

                        const helper = (data) => {
                            if (!data) {
                                return data
                            }
                            const temp = []
                            data.map((sub, i) => {
                                temp.push([
                                    {
                                        id: sub.id,
                                        name: sub.locals[0].name,
                                        image: sub.image,
                                        parent_id: sub.catagory_id,
                                        catagory_id: sub.id,
                                    },
                                ])
                                if (sub.sub) {
                                    sub.sub.map((data) => {
                                        temp[i].push([
                                            {
                                                id: data.id,
                                                name: data.locals[0].name,
                                                image: data.image,
                                                parent_id: data.catagory_id,
                                                catagory_id: data.id,
                                            },
                                        ])
                                    })
                                }
                            })
                            res.push(temp)
                            return helper(data.sub)
                        }
                        helper(data.sub)
                        return res
                    }
                    payload.map((catalog) => {
                        const i = getData(catalog)
                        state.data.push(i)
                    })
                }
            )
            .addMatcher(
                apiSlice.endpoints.showBranchCatalogs.matchFulfilled,
                (state, { payload }) => {
                    payload.map((catalog) => {
                        state.selectedCatalogs.push(String(catalog.catagory_id))
                        catalog.sub.map((catalogSub) => {
                            state.selectedCatalogs.push(
                                String(catalogSub.catagory_id)
                            )
                            catalogSub.sub.map((catalogSubSub) => {
                                state.selectedCatalogs.push(
                                    String(catalogSubSub.catagory_id)
                                )
                            })
                        })
                    })

                    const data = JSON.parse(JSON.stringify(payload))
                    for (let i = 0; i < payload.length; i++) {
                        let sub = true
                        data[i].name = data[i].catalocales[0].name

                        let tree = data[i].sub
                        while (sub) {
                            if (tree) {
                                for (let k = 0; k < tree.length; k++) {
                                    tree[k].name = tree[k].catalocales[0]
                                        ? tree[k].catalocales[0].name
                                        : 'asd'

                                    for (
                                        let j = 0;
                                        j < tree[k].sub.length;
                                        j++
                                    ) {
                                        tree[k].sub[j].name = tree[k].sub[j]
                                            .catalocales[0]
                                            ? tree[k].sub[j].catalocales[0].name
                                            : 'asd'
                                    }
                                }

                                tree = tree.sub || null
                            } else {
                                sub = false
                            }
                        }
                        sub = true
                    }

                    state.list = [...data]
                }
            )
    },
})

export const { setCatalogs, deleteData } = branchCatalogSlice.actions

export default branchCatalogSlice.reducer
export const currLang = (state) => state.branchCatalog.language
export const branchCatalogStatus = (state) => state.branchCatalog.status
export const branchCatalogData = (state) => state.branchCatalog.data
export const selectedCatalogs = (state) => state.branchCatalog.selectedCatalogs
export const branchCatalogList = (state) => state.branchCatalog.list
