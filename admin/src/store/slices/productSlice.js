import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        types: [],
        variantCombination: [],
        variants: {},
        steps: ['General Info', 'Review'],
        descriptions: {},
        names: {},
        languages: [],
        language: 'Az',
        temp: {},
        status: false,
        general: {},
        managers: [],
    },
    reducers: {
        setProductLocales: (state, action) => {
            state.temp = {}
            const { description, name } = action.payload
            state.descriptions[`${state.language}_description`] = description
            state.names[`${state.language}_name`] = name
        },
        deleteData: (state) => {
            state.language = 'Az'
            state.names = []
            state.descriptions = {}
            state.variantCombination = []
            state.variants = {}
            state.steps = ['General Info', 'Review']
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
                if (!state.names[`${state.languages[i]}_name`]) {
                    state.names[`${state.languages[i]}_name`] =
                        state.names[`${state.languages[0]}_name`]
                    state.descriptions[`${state.languages[i]}_description`] =
                        state.descriptions[`${state.languages[0]}_description`]
                }
            }
            state.status = true
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
        addVariants: (state, action) => {
            state.variants[action.payload] = []
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
        addVariantsToOption: (state, action) => {
            const { type, option } = action.payload
            if (state.variants[type].indexOf(option) > -1) {
                return
            }
            state.variants[type].push(option)

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
        deleteOption: (state, action) => {
            delete state.variants[action.payload]
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
        deleteOptions: (state, action) => {
            delete state.variants[action.payload.branch].splice(
                state.variants[action.payload.branch].indexOf(
                    action.payload.value
                ),
                1
            )
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
} = productSlice.actions

export default productSlice.reducer
export const productTypes = (state) => state.product.types
export const currVariants = (state) => state.product.variants
export const currCombinations = (state) => state.product.variantCombination
export const allSteps = (state) => state.product.steps
export const namesTemp = (state) => state.product.temp
export const generalInfo = (state) => state.product.general
export const localNames = (state) => state.product.names
export const localDescription = (state) => state.product.descriptions
export const currLang = (state) => state.product.language
export const allManagers = (state) => state.product.managers
