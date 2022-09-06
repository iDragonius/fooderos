import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'

const branchSliceList = createSlice({
    name: 'branchList',
    initialState: {
        stores: [],
        currentStore: null,
        currentStoreId: null,
        changed: 0,
        branchNames: {},
        addresses: {},
        language: 'Az',
        languages: [],
        paymentOptions: [],
        currencies: [],
        data: [],
        status: false,
        currBranch: {},
        currBranchSchedule: {},
        completed: false,
    },
    reducers: {
        setCurrent: (state, action) => {
            const { name, id } = action.payload
            state.currentStore = name
            state.currentStoreId = id
            localStorage.setItem('store', name)
            localStorage.setItem('store_id', id)
        },

        incrementChanged: (state) => {
            state.changed++
        },
        checkBranchData: (state) => {
            for (let i = 0; i < state.languages.length; i++) {
                if (!state.branchNames[`${state.languages[i]}_name`]) {
                    state.branchNames[`${state.languages[i]}_name`] =
                        state.branchNames[`${state.languages[0]}_name`]
                }
                if (!state.addresses[`${state.languages[i]}_address`]) {
                    state.addresses[`${state.languages[i]}_address`] =
                        state.addresses[`${state.languages[0]}_address`]
                }
            }
            state.status = true
        },
        changeLanguage: (state, action) => {
            state.language = action.payload
        },
        setBranchData: (state, action) => {
            const { name, address } = action.payload
            state.branchNames[`${state.language}_name`] = name
            state.addresses[`${state.language}_address`] = address
        },
        destroyStatus: (state) => {
            state.status = false
        },
        destroyCompleted: (state) => {
            state.completed = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                apiSlice.endpoints.branchStores.matchFulfilled,
                (state, { payload }) => {
                    state.stores = [...payload]
                }
            )
            .addMatcher(
                apiSlice.endpoints.cities.matchFulfilled,
                (state, { payload }) => {
                    state.changed++
                }
            )
            .addMatcher(
                apiSlice.endpoints.payment.matchFulfilled,
                (state, { payload }) => {
                    console.log(payload)
                    for (
                        let i = 0;
                        i < payload['Payment options'].length;
                        i++
                    ) {
                        state.paymentOptions.push(
                            payload['Payment options'][i].name
                        )
                    }
                    for (let i = 0; i < payload['Currencies'].length; i++) {
                        state.currencies.push(payload['Currencies'][i].name)
                    }
                }
            )
            .addMatcher(
                apiSlice.endpoints.branchStoreList.matchFulfilled,
                (state, { payload }) => {
                    let data = []
                    payload.map((store) => {
                        data = [
                            ...data,
                            {
                                ...store,
                                name: store.locals[0].name,
                                address: store.locals[0].address,
                                sort: store.status,
                            },
                        ]
                    })
                    state.data = [...data]
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
                apiSlice.endpoints.showBranch.matchFulfilled,
                (state, { payload }) => {
                    let days = [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                    ]
                    for (let i = 0; i < payload.schedule.length; i++) {
                        state.currBranchSchedule[days[i]] = {
                            start: payload.schedule[i].start,
                            end: payload.schedule[i].end,
                            closed: payload.schedule[i].isclosed,
                        }
                    }
                    let currency = []
                    for (
                        let i = 0;
                        i < payload.currency.split(',').length;
                        i++
                    ) {
                        currency.push({
                            value: payload.currency.split(',')[i],
                            label: payload.currency.split(',')[i],
                        })
                    }
                    let payment = []
                    for (
                        let i = 0;
                        i < payload.payment.split(',').length;
                        i++
                    ) {
                        payment.push({
                            value: payload.payment.split(',')[i],
                            label: payload.payment.split(',')[i],
                        })
                    }
                    state.currBranch.phone = payload.phone.slice(4)
                    state.currBranch.amount = payload.amount
                    state.currBranch.cash_limit = payload.cash_limit
                    state.currBranch.coordinates = {
                        lat: Number(payload.lat),
                        lng: Number(payload.long),
                    }
                    state.currBranch.currency = currency
                    state.currBranch.payment = payment
                    state.currBranch.banner = payload.cover
                    state.currBranch.profile = payload.profile
                    state.currBranch.maxDistance = payload.max_distance
                    state.currBranch.country = {
                        value: payload.country,
                        label: payload.country,
                    }
                    state.currBranch.city = {
                        value: payload.city,
                        label: payload.city,
                    }
                    state.currBranch.paylaod = payload.payload

                    for (let i = 0; i < state.languages.length; i++) {
                        state.branchNames[`${state.languages[i]}_name`] =
                            payload.locals[i].name
                        state.addresses[`${state.languages[i]}_address`] =
                            payload.locals[i].address
                    }
                    state.completed = true
                }
            )
    },
})

export const {
    setCurrent,
    incrementChanged,
    changeLanguage,
    checkBranchData,
    setBranchData,
    destroyStatus,
    destroyCompleted,
} = branchSliceList.actions

export default branchSliceList.reducer
export const allStores = (state) => state.branchList.stores
export const currBranchName = (state) => state.branchList.currentStore
export const currId = (state) => state.branchList.currentStoreId
export const changed = (state) => state.branchList.changed
export const allCurrencies = (state) => state.branchList.currencies
export const allPaymentMethods = (state) => state.branchList.paymentOptions
export const branchData = (state) => state.branchList.data
export const currLanguage = (state) => state.branchList.language
export const currNames = (state) => state.branchList.branchNames
export const currAddresses = (state) => state.branchList.addresses
export const branchStatus = (state) => state.branchList.status
export const currBranch = (state) => state.branchList.currBranch
export const currBranchSchedule = (state) => state.branchList.currBranchSchedule
export const completed = (state) => state.branchList.completed
