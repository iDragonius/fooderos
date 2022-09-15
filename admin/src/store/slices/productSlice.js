import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        types: [],
        variantCombination: [],
        variants: {},
        steps: ['General Info', 'Review'],
        currentStep: 'General Info',
        descriptions: {},
        namesLocal: {},
        languages: [],
        language: 'Az',
        temp: {},
        status: false,
        general: {},
        managers: [],
        stores: [],
        optionLocals: {},
        variantLocals: {},
        combinationData: {},
        addonData: [],
        productsData: [],
    },
    reducers: {
        changeStep: (state, action) => {
            state.currentStep = action.payload
        },
        setProductLocales: (state) => {
            state.descriptions[`${state.language}_description`] =
                state.temp.description
            state.namesLocal[`${state.language}_name`] = state.temp.name
            // state.temp = {}
        },
        deleteData: (state) => {
            state.language = 'Az'
            state.names = []
            state.descriptions = {}
            state.variantCombination = []
            state.variants = {}
            state.steps = ['General Info', 'Review']
            state.status = false
            state.combinationData = {}
            state.optionLocals = {}
            state.general = {}
            state.temp = {}
        },
        setTemp: (state, action) => {
            const { description, name } = action.payload
            state.temp.description = description
                ? description
                : state.temp.description
            state.temp.name = name ? name : state.temp.name
        },
        checkProductData: (state) => {
            for (let i = 0; i < state.languages.length; i++) {
                if (!state.namesLocal[`${state.languages[i]}_name`]) {
                    state.namesLocal[`${state.languages[i]}_name`] =
                        state.namesLocal[`${state.languages[0]}_name`]
                    state.descriptions[`${state.languages[i]}_description`] =
                        state.descriptions[`${state.languages[0]}_description`]
                }
            }
            if (!state.general.isVariants) {
                state.general.isVariants = 0
            }
            if (!state.general.isAddons) {
                state.general.isAddons = 0
            }
            state.status = true
        },
        setCombinationData: (state, action) => {
            const { name, type, value } = action.payload
            let nameStr = ''
            name.map((option) => {
                nameStr = nameStr + ',' + option
            })
            nameStr = nameStr.slice(1)
            if (!state.combinationData[nameStr]) {
                state.combinationData[nameStr] = {}
            }
            state.combinationData[nameStr][type] = value
        },
        destroyStatus: (state) => {
            state.status = false
        },
        setGeneralData: (state, action) => {
            const { type, value } = action.payload
            state.general[type] = value
        },
        changeLanguage: (state, action) => {
            state.language = action.payload
        },
        setCombinations: (state, action) => {
            console.log(action)
        },
        setAllAddonData: (state, action) => {
            const { name, sku, barcode, price, weight, status } = action.payload
            state.addonData.push({
                Az_name: name,
                Ru_name: name,
                En_name: name,
                sku,
                barcode,
                price,
                weight,
                status,
            })
        },
        setAddonData: (state, action) => {
            const { id, value, type } = action.payload
            state.addonData[id][type] = value
        },
        addVariants: (state, action) => {
            const { newName, oldName } = action.payload

            if (!oldName) {
                state.variants[newName] = []
                state.variantLocals[newName] = {}
                state.languages.map((lang) => {
                    state.variantLocals[newName][`${lang}_name`] = newName
                })
                return
            }
            state.variantLocals[newName] = state.variantLocals[oldName]
            delete state.variantLocals[oldName]
            state.optionLocals[newName] = state.optionLocals[oldName]
            delete state.optionLocals[oldName]
            state.variants[newName] = state.variants[oldName]
            delete state.variants[oldName]
        },
        addSteps: (state, action) => {
            state.steps.pop()
            state.steps.push(action.payload)
            state.steps.push('Review')
            if (state.steps.length === 4) {
                state.steps.splice(1, 3)
                state.steps.push('Variant Info', 'Add on', 'Review')
            }
        },
        deleteSteps: (state, action) => {
            state.steps.splice(state.steps.indexOf(action.payload), 1)
        },
        addLocalsToOption: (state, action) => {
            const { option, lang, keyData, type } = action.payload
            state.optionLocals[type][keyData][`${lang}_name`] = option
        },
        addVariantsToOption: (state, action) => {
            const { type, option, keyData } = action.payload
            if (state.variants[type].indexOf(option) > -1) {
                return
            }
            state.variants[type].push(option)
            if (Object.keys(state.optionLocals).indexOf(type) === -1) {
                state.optionLocals[type] = {}
            }
            state.optionLocals[type][keyData] = {}
            state.languages.map((lang) => {
                state.optionLocals[type][keyData][`${lang}_name`] = option
            })
            state.combinationData = {}
            state.variantCombination = []
            const temp = []

            Object.keys(state.variants).map((variant) => {
                temp.push(state.variants[variant])
            })

            const combineAll = (array) => {
                const res = []
                let max = array.length - 1
                const helper = (arr, i) => {
                    for (let j = 0, l = array[i].length; j < l; j++) {
                        let copy = arr.slice(0)
                        copy.push(array[i][j])
                        if (i === max) res.push(copy)
                        else helper(copy, i + 1)
                    }
                }
                helper([], 0)
                return res
            }
            const combine = combineAll(temp)
            state.variantCombination = [...combine]
        },
        setAllCombinationData: (state, action) => {
            const { sku, status, barcode, price, weight, name } = action.payload
            let nameStr = ''
            name.map((option) => {
                nameStr = nameStr + ',' + option
            })
            nameStr = nameStr.slice(1)

            state.combinationData[nameStr] = {}
            state.combinationData[nameStr].sku = sku
            state.combinationData[nameStr].barcode = barcode
            state.combinationData[nameStr].price = price
            state.combinationData[nameStr].weight = weight
            state.combinationData[nameStr].status = status
        },
        changeCombinationLang: (state) => {
            let data = []
            Object.keys(state.optionLocals).map((option) => {
                let temp = []

                Object.keys(state.optionLocals[option]).map((o) => {
                    temp.push(
                        state.optionLocals[option][o][`${state.language}_name`]
                    )
                })
                data.push(temp)
                temp = []
                // state.optionLocals[option]
            })
            const combineAll = (array) => {
                const res = []
                let max = array.length - 1
                const helper = (arr, i) => {
                    for (let j = 0, l = array[i].length; j < l; j++) {
                        let copy = arr.slice(0)
                        copy.push(array[i][j])
                        if (i === max) res.push(copy)
                        else helper(copy, i + 1)
                    }
                }
                helper([], 0)
                return res
            }
            const combine = combineAll(data)
            state.variantCombination = [...combine]
        },
        deleteOption: (state, action) => {
            console.log(action.payload.name)
            delete state.variants[action.payload.name]
            delete state.optionLocals[action.payload.name]
            state.variantCombination = []
            const temp = []
            if (Object.keys(state.variants).length > 0) {
                Object.keys(state.variants).map((variant) => {
                    temp.push(state.variants[variant])
                })

                const combineAll = (array) => {
                    const res = []
                    let max = array.length - 1
                    const helper = (arr, i) => {
                        for (let j = 0, l = array[i].length; j < l; j++) {
                            let copy = arr.slice(0)
                            copy.push(array[i][j])
                            if (i === max) res.push(copy)
                            else helper(copy, i + 1)
                        }
                    }
                    helper([], 0)
                    return res
                }
                const combine = combineAll(temp)
                state.variantCombination = [...combine]
            }
        },
        deleteOptions: (state, action) => {
            console.log(action.payload)
            delete state.variants[action.payload.branch].splice(
                state.variants[action.payload.branch].indexOf(
                    action.payload.value
                ),
                1
            )
            delete state.optionLocals[action.payload.branch][
                action.payload.keyData
            ]
            state.variantCombination = []
            const temp = []

            Object.keys(state.variants).map((variant) => {
                temp.push(state.variants[variant])
            })

            const combineAll = (array) => {
                const res = []
                let max = array.length - 1
                const helper = (arr, i) => {
                    for (let j = 0, l = array[i].length; j < l; j++) {
                        let copy = arr.slice(0)
                        copy.push(array[i][j])
                        if (i === max) res.push(copy)
                        else helper(copy, i + 1)
                    }
                }
                helper([], 0)
                return res
            }
            const combine = combineAll(temp)
            state.variantCombination = [...combine]
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                apiSlice.endpoints.productTypes.matchFulfilled,
                (state, { payload }) => {
                    payload.map((type) => {
                        state.types.push({
                            value: type.name,
                            label: type.name,
                        })
                    })
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
                apiSlice.endpoints.managers.matchFulfilled,
                (state, { payload }) => {
                    payload.map((manager) => {
                        state.managers.push({
                            label: manager.name,
                            value: manager.name,
                        })
                    })
                }
            )
            .addMatcher(
                apiSlice.endpoints.catalogTypes.matchFulfilled,
                (state, { payload }) => {
                    payload.stores.map((store) => {
                        state.stores.push({ value: store, label: store })
                    })
                }
            )
            .addMatcher(
                apiSlice.endpoints.showProducts.matchFulfilled,
                (state, { payload }) => {
                    console.log(payload)
                    state.productsData = []
                    payload.map((product) => {
                        state.productsData.push({
                            id: product.id,
                            name: product.locals[0].name,
                            store: product.store[0]
                                ? product.store[0].name
                                : 'General',
                            status: product.status,
                            image: product.image,
                        })
                    })
                }
            )
    },
})

export const {
    addVariants,
    setCombinations,
    addVariantsToOption,
    deleteOption,
    deleteOptions,
    addSteps,
    deleteSteps,
    setProductLocales,
    deleteData,
    changeLanguage,
    checkProductData,
    destroyStatus,
    setGeneralData,
    setTemp,
    addLocalsToOption,
    changeCombinationLang,
    setCombinationData,
    changeStep,
    setAllCombinationData,
    setAddonData,
    setAllAddonData,
} = productSlice.actions

export default productSlice.reducer
export const productTypes = (state) => state.product.types
export const currVariants = (state) => state.product.variants
export const currCombinations = (state) => state.product.variantCombination
export const allSteps = (state) => state.product.steps
export const namesTemp = (state) => state.product.temp
export const generalInfo = (state) => state.product.general
export const localNames = (state) => state.product.namesLocal
export const localDescription = (state) => state.product.descriptions
export const currLang = (state) => state.product.language
export const allManagers = (state) => state.product.managers
export const allStores = (state) => state.product.stores
export const productStatus = (state) => state.product.status
export const optionLocals = (state) => state.product.optionLocals
export const variantLocals = (state) => state.product.variantLocals
export const currStep = (state) => state.product.currentStep
export const combData = (state) => state.product.combinationData
export const addonData = (state) => state.product.addonData
export const productsData = (state) => state.product.productsData
