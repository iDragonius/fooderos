import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import ImgUpload from '../imgUpload/ImgUpload'
import styles from '../../new/NewProduct.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
    addSteps,
    allManagers,
    allSteps,
    allStores,
    currLang,
    dataStatus,
    deleteSteps,
    generalInfo,
    localDescription,
    localNames,
    namesTemp,
    setGeneralData,
    setTemp,
} from '../../../../../store/slices/productSlice'
import { useManagersQuery } from '../../../../../store/slices/api/storeApiSlice'
import { useCatalogTypesQuery } from '../../../../../store/slices/api/catalogApiSlice'
import { useLocation } from 'react-router-dom'

const General = ({ file, setFile }) => {
    const [special, setSpecial] = useState(false)
    const [haveVariants, setHaveVariants] = useState(false)
    const [haveAddons, setHaveAddons] = useState(false)
    const [vendor, setVendor] = useState([])
    const [store, setStore] = useState([])
    const [sku, setSku] = useState('')
    const [barcode, setBarcode] = useState('')
    const [price, setPrice] = useState('')
    const [position, setPosition] = useState('')
    const lang = useSelector(currLang)
    const steps = useSelector(allSteps)
    const [selectedStore, setSelectedStore] = useState({})
    const [selectedVendor, setSelectedVendor] = useState({})

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const temp = useSelector(namesTemp)
    const managers = useSelector(allManagers)
    const stores = useSelector(allStores)
    const status = useSelector(dataStatus)
    const location = useLocation()
    const names = useSelector(localNames)
    const descriptions = useSelector(localDescription)
    const generalData = useSelector(generalInfo)
    const { data: manag, isSuccess: success } = useManagersQuery()
    const { data } = useCatalogTypesQuery({
        lang: localStorage.getItem('lang'),
        rest: location.pathname.split('/')[2],
    })
    useEffect(() => {
        steps.indexOf('Variant Info') > -1 && setHaveVariants(true)
        steps.indexOf('Add on') > -1 && setHaveAddons(true)
    }, [steps])
    useEffect(() => {
        setDescription(temp.description ? temp.description : '')
        setName(temp.name ? temp.name : '')
    }, [temp])
    useEffect(() => {
        setVendor(managers ? managers : [])
    }, [managers])
    useEffect(() => {
        setStore(stores ? stores : [])
    }, [stores])
    useEffect(() => {
        setName(names[`${lang}_name`])
        setDescription(descriptions[`${lang}_description`])
    }, [lang])

    useEffect(() => {
        if (status) {
            dispatch(
                setTemp({
                    name: names[`${lang}_name`],
                    description: descriptions[`${lang}_description`],
                })
            )
            setName(names[`${lang}_name`])
            setDescription(descriptions[`${lang}_description`])
            setBarcode(generalData.barcode)
            setSku(generalData.sku)
            setPosition(generalData.positionId)
            setPrice(generalData.price)
            setSpecial(generalData.haveStore === 1)
            setSelectedStore(
                generalData.haveStore === 1
                    ? {
                          label: generalData.store_id,
                          value: generalData.store_id,
                      }
                    : {}
            )
            setSelectedVendor(
                generalData.manager !== null
                    ? {
                          label: managers[generalData.manager].label,
                          value: managers[generalData.manager].value,
                      }
                    : {}
            )
        }
    }, [status])
    const dispatch = useDispatch()
    return (
        <div className={'mt-4 '}>
            <div
                className={'rounded-[6px]  mb-10 pb-1'}
                style={{ boxShadow: '1px  1px 10px #cfcfcf' }}
            >
                <h1
                    className={
                        'text-[#1a242f] text-[24px] py-6 border-b-[1px] px-12'
                    }
                >
                    Product Type
                </h1>
                <div className={' px-12 pt-10 pb-6'}>
                    <input
                        type="checkbox"
                        checked={special}
                        className={'mr-3'}
                        onChange={(e) => {
                            setSpecial(e.target.checked)
                            dispatch(
                                setGeneralData({
                                    type: 'haveStore',
                                    value: e.target.checked ? 1 : 0,
                                })
                            )
                        }}
                    />
                    <label
                        className={'select-none text-[#424b56] text-[20px]'}
                        onClick={() => {
                            special ? setSpecial(false) : setSpecial(true)
                            dispatch(
                                setGeneralData({
                                    type: 'haveStore',
                                    value: special ? 0 : 1,
                                })
                            )
                        }}
                    >
                        This product special for any market?{' '}
                    </label>
                </div>
                {special && (
                    <div className={'w-[600px] ml-12'}>
                        <Select
                            options={store}
                            value={selectedStore}
                            onChange={(data) => {
                                setSelectedStore(data)
                                dispatch(
                                    setGeneralData({
                                        type: 'store_id',
                                        value: data.value,
                                    })
                                )
                            }}
                            className={'  mb-10'}
                        />
                    </div>
                )}
            </div>
            <div
                className={'rounded-[6px]  mb-10 pb-24 '}
                style={{ boxShadow: '1px  1px 10px #cfcfcf' }}
            >
                <h1
                    className={
                        'text-[#1a242f] text-[24px] py-6 border-b-[1px] px-12'
                    }
                >
                    Product Info
                </h1>
                <div className={'flex mt-8 ml-12 '}>
                    <ImgUpload
                        file={file}
                        setFile={setFile}
                        path={generalData.image}
                    />
                    <div className={'w-[600px] ml-12'}>
                        <div className={styles.tagName}>
                            <div className={styles.phoneOpt + ' w-60'}>
                                <input
                                    type="text"
                                    className={styles.inp}
                                    required={true}
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                        dispatch(
                                            setTemp({ name: e.target.value })
                                        )
                                    }}
                                />
                                <label className={styles.phoneL}>
                                    Product Name
                                </label>
                            </div>
                        </div>
                        <div className={' relative mt-[6px]'}>
                            <textarea
                                name=""
                                id=""
                                rows="9"
                                className={styles.textArea}
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                    dispatch(
                                        setTemp({ description: e.target.value })
                                    )
                                }}
                            ></textarea>
                            <label className={styles.textAre}>
                                Description
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex justify-between '}>
                <div
                    className={'rounded-[6px]  mb-10 pb-16 pb-1 w-[49%] '}
                    style={{ boxShadow: '1px  1px 10px #cfcfcf' }}
                >
                    <h1
                        className={
                            'text-[#1a242f] text-[24px] py-6 border-b-[1px] px-12'
                        }
                    >
                        Inventory
                    </h1>
                    <div className={'mt-5'}>
                        <div className={'flex justify-between '}>
                            <div className={styles.tagName}>
                                <div className={styles.phoneOpt + ' ml-3'}>
                                    <input
                                        type="text"
                                        className={styles.inp}
                                        required={true}
                                        value={sku}
                                        onChange={(e) => {
                                            setSku(e.target.value)
                                            dispatch(
                                                setGeneralData({
                                                    type: 'sku',
                                                    value: e.target.value,
                                                })
                                            )
                                        }}
                                    />
                                    <label className={styles.phoneL}>SKU</label>
                                </div>
                            </div>
                            <div className={styles.tagName + ' mr-4'}>
                                <div className={styles.phoneOpt}>
                                    <input
                                        type="text"
                                        className={styles.inp}
                                        required={true}
                                        value={barcode}
                                        onChange={(e) => {
                                            setBarcode(e.target.value)
                                            dispatch(
                                                setGeneralData({
                                                    type: 'barcode',
                                                    value: e.target.value,
                                                })
                                            )
                                        }}
                                    />
                                    <label className={styles.phoneL}>
                                        Barcode
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.tagName}>
                            <div className={styles.phoneOpt + ' px-3'}>
                                <input
                                    type="text"
                                    className={styles.inp}
                                    required={true}
                                    value={position}
                                    onChange={(e) => {
                                        setPosition(e.target.value)
                                        dispatch(
                                            setGeneralData({
                                                type: 'positionId',
                                                value: e.target.value,
                                            })
                                        )
                                    }}
                                />
                                <label className={styles.phoneL}>
                                    Position ID
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={'rounded-[6px]  mb-10 pb-1 w-[49%]'}
                    style={{ boxShadow: '1px  1px 10px #cfcfcf' }}
                >
                    <h1
                        className={
                            'text-[#1a242f] text-[24px] py-6 border-b-[1px] px-12'
                        }
                    >
                        Pricing
                    </h1>
                    <div className={'mt-11'}>
                        <div className={styles.tagName + ' px-4'}>
                            <div className={styles.phoneOpt}>
                                <input
                                    type="text"
                                    className={styles.inp}
                                    required={true}
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                        dispatch(
                                            setGeneralData({
                                                type: 'price',
                                                value: e.target.value,
                                            })
                                        )
                                    }}
                                />
                                <label className={styles.phoneL}>
                                    Unit Price
                                </label>
                            </div>
                        </div>
                        <div className={styles.tagName + ' px-4'}>
                            <div className={styles.phoneOpt}>
                                <input
                                    type="text"
                                    className={styles.inp}
                                    required={true}
                                    onChange={(e) =>
                                        dispatch(
                                            setGeneralData({
                                                type: 'weight',
                                                value: e.target.value,
                                            })
                                        )
                                    }
                                />
                                <label className={styles.phoneL}>Weight</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={'rounded-[6px]  mb-10 pb-1'}
                style={{ boxShadow: '1px  1px 10px #cfcfcf' }}
            >
                <h1
                    className={
                        'text-[#1a242f] text-[24px] py-6 border-b-[1px] px-12'
                    }
                >
                    Vendor
                </h1>
                <div className={'mt-10'}>
                    <Select
                        options={vendor}
                        value={selectedVendor}
                        onChange={(data) => {
                            dispatch(
                                setGeneralData({
                                    type: 'manager',
                                    value: data.value,
                                })
                            )
                        }}
                        className={'w-1/3 ml-12 mb-10'}
                    />
                </div>
            </div>
            <div
                className={'rounded-[6px]  mb-10 pb-1'}
                style={{ boxShadow: '1px  1px 10px #cfcfcf' }}
            >
                <h1
                    className={
                        'text-[#1a242f] text-[24px] py-6 border-b-[1px] px-12'
                    }
                >
                    Variant Info
                </h1>
                <div className={' px-12 pt-10 pb-6'}>
                    <input
                        type="checkbox"
                        checked={haveVariants}
                        className={'mr-3'}
                        readOnly={true}
                    />
                    <label className={'select-none text-[#424b56] text-[20px]'}>
                        This product has multiple options, like different sizes
                        or colors
                    </label>
                </div>
            </div>
            <div
                className={'rounded-[6px]  mb-10 pb-1'}
                style={{ boxShadow: '1px  1px 10px #cfcfcf' }}
            >
                <h1
                    className={
                        'text-[#1a242f] text-[24px] py-6 border-b-[1px] px-12'
                    }
                >
                    Add on
                </h1>
                <div className={' px-12 pt-10 pb-6'}>
                    <input
                        type="checkbox"
                        checked={haveAddons}
                        className={'mr-3'}
                        readOnly={true}
                    />
                    <label className={'select-none text-[#424b56] text-[20px]'}>
                        This product has add ons
                    </label>
                </div>
            </div>
        </div>
    )
}

export default General
