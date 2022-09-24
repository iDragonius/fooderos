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
        editCombinationData: [],
        editOptions: {},
        editVariants: [],
        newEditOptions: {},
        newEditCombinationData: [],
        completedProductData: false,
    },
    reducers: {
        changeStep: (state, action) => {
            state.currentStep = action.payload
        },
        setProductLocales: (state) => {
            state.descriptions[`${state.language}_description`] =
                state.temp.description
            state.namesLocal[`${state.language}_name`] = state.temp.name
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
            state.completedProductData = false
            state.editCombinationData = []
            state.addonData = []
            state.editOptions = {}
            state.editVariants = []
            state.namesLocal = {}
            state.newEditCombinationData = []
            state.newEditOptions = {}
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
            if (typeof name === 'object') {
                name.map((option) => {
                    nameStr = nameStr + ',' + option
                })
                nameStr = nameStr.slice(1)
                if (!state.combinationData[nameStr]) {
                    state.combinationData[nameStr] = {}
                }
                state.combinationData[nameStr][type] = value
            } else {
                const temp = state.editCombinationData.find(
                    (data) => data.name === name
                )
                temp[type] = value
            }
        },
        setNewCombinationData: (state, action) => {
            const { name, type, value } = action.payload

            const temp = state.newEditCombinationData.find(
                (data) => data.name === name
            )
            temp[type] = value
        },
        destroyStatus: (state) => {
            state.status = false
        },
        destroyDataStatus: (state) => {
            state.completedProductData = false
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
            const { name, sku, barcode, price, weight, status, id, limit } =
                action.payload
            if (state.addonData.at(id) === undefined) {
                state.addonData.push({
                    Az_name: name,
                    Ru_name: name,
                    En_name: name,
                    sku,
                    barcode,
                    price,
                    weight,
                    limit,
                    status,
                    id: null,
                })
            }
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
        addEditVariantsToOption: (state, action) => {
            const { type, option, keyData } = action.payload
            if (state.editOptions[type].indexOf(option) > -1) {
                return
            }
            if (!state.newEditOptions[type]) {
                state.newEditOptions[type] = []
            }

            state.newEditOptions[type].push(option)

            const temp = []
            temp.push([option])
            const variants = Object.keys(state.editOptions).filter(
                (variant) => Number(variant) !== type
            )
            variants.map((variant) => {
                temp.push(
                    state.editOptions[variant].concat(
                        state.newEditOptions[variant]
                            ? state.newEditOptions[variant]
                            : []
                    )
                )
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
            console.log(combine)
            combine.map((combination) => {
                let name = ''
                combination.map((i) => {
                    name = name + ',' + i
                })
                name = name.slice(1)
                state.newEditCombinationData.push({
                    name,
                    sku: '',
                    barcode: '',
                    price: '',
                    weight: '',
                    status: 1,
                })
            })
        },
        setAllCombinationData: (state, action) => {
            const { sku, status, barcode, price, weight, name } = action.payload
            let nameStr = ''
            name.map((option) => {
                nameStr = nameStr + ',' + option
            })
            nameStr = nameStr.slice(1)

            if (!state.combinationData[nameStr]) {
                state.combinationData[nameStr] = {}
                state.combinationData[nameStr].sku = sku
                state.combinationData[nameStr].barcode = barcode
                state.combinationData[nameStr].price = price
                state.combinationData[nameStr].weight = weight
                state.combinationData[nameStr].status = status
            }
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
            delete state.variants[action.payload.name]
            delete state.optionLocals[action.payload.name]
            state.variantCombination = []
            const temp = []
            if (Object.keys(state.variants).length > 0) {
                console.log(1231)
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
        deleteNewOption: (state, action) => {
            const { branch, value } = action.payload
            const index = state.editVariants.findIndex(
                (data) => data.name === branch
            )
            console.log(index)
            const newData = state.newEditOptions[index].filter(
                (data) => data !== value
            )

            const combs = state.newEditCombinationData.filter(
                (data) => data.name.split(',').indexOf(value) === -1
            )
            state.newEditCombinationData = combs
            state.newEditOptions[index] = newData
        },

        deleteOptions: (state, action) => {
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
                    state.managers = []
                    payload.map((manager) => {
                        state.managers.push({
                            label: manager.name,
                            value: manager.id,
                        })
                    })
                }
            )
            .addMatcher(
                apiSlice.endpoints.catalogTypes.matchFulfilled,
                (state, { payload }) => {
                    state.stores = []
                    payload.stores.map((store) => {
                        state.stores.push({ value: store, label: store })
                    })
                }
            )
            .addMatcher(
                apiSlice.endpoints.showProducts.matchFulfilled,
                (state, { payload }) => {
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
            .addMatcher(
                apiSlice.endpoints.showProduct.matchFulfilled,
                (state, { payload }) => {
                    state.completedProductData = false
                    state.general = {
                        isVariants: payload.isVariant,
                        isAddons: payload.isAddons,
                        id: payload.id,
                        store_id: payload.store[0] && payload.store[0].name,
                        image: payload.image,
                        price: payload.price,
                        sku: payload.sku,
                        barcode: payload.barcode,
                        positionId: payload.position_id,
                        haveStore: payload.store.length > 0 ? 1 : 0,
                    }
                    state.steps = ['General Info']
                    if (payload.isVariant === 1) {
                        console.log('variant')
                        state.steps.push('Variant Info')
                    }
                    if (payload.isAddons === 1) {
                        console.log('add')
                        state.steps.push('Add on')
                    }
                    state.steps.push('Review')

                    payload.locals.map((local) => {
                        state.descriptions[`${local.lang}_description`] =
                            local.description
                        state.namesLocal[`${local.lang}_name`] = local.name
                    })
                    payload.addons.map((addon) => {
                        const tempLang = {}
                        addon.locales.map((local) => {
                            tempLang[`${local.lang}_name`] = local.name
                        })
                        state.addonData.push({
                            ...tempLang,
                            id: addon.id,
                            sku: addon.sku,
                            barcode: addon.barcode,
                            weight: addon.weight,
                            price: addon.unit_price,
                            status: addon.status,
                            limit: addon.addon_limit,
                        })
                    })
                    state.general.manager = payload.manager_id
                    payload.variants.map((variant) => {
                        let temp = ''
                        variant.combination.map((combination) => {
                            temp =
                                temp + ',' + combination.locales_value[0].name
                        })
                        state.editCombinationData.push({
                            name: temp.slice(1),
                            id: variant.id,
                            image: variant.image,
                            sku: variant.sku,
                            barcode: variant.barcode,
                            price: variant.price,
                            weight: variant.weight,
                            status: variant.status,
                        })
                    })
                    payload.option.map((variant) => {
                        let index = state.editVariants.length
                        state.editVariants.push({
                            name: variant.locales[0].name,
                            id: variant.id,
                        })

                        state.editOptions[index] = []

                        variant.values.map((opt) => {
                            state.editOptions[index].push(opt.values[0].name)
                        })
                    })
                    state.completedProductData = true
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
    destroyDataStatus,
    addEditVariantsToOption,
    setNewCombinationData,
    deleteNewOption,
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
export const dataStatus = (state) => state.product.completedProductData
export const editVariantsData = (state) => state.product.editCombinationData
export const editVariantsTypes = (state) => state.product.editVariants
export const editVariantsOptions = (state) => state.product.editOptions
export const newEditVariantOptions = (state) => state.product.newEditOptions
export const newCombinationData = (state) =>
    state.product.newEditCombinationData
