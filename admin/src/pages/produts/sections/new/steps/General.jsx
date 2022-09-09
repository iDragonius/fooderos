import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import ImgUpload from '../imgUpload/ImgUpload'
import styles from '../NewProduct.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
    addSteps,
    allManagers,
    allSteps,
    deleteSteps,
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
    const steps = useSelector(allSteps)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const temp = useSelector(namesTemp)
    const managers = useSelector(allManagers)
    const location = useLocation()
    const { data: manag, isSuccess: success } = useManagersQuery()
    const { data, isSuccess, refetch } = useCatalogTypesQuery({
        lang: localStorage.getItem('lang'),
        rest: location.pathname.split('/')[2],
    })
    useEffect(() => {
        steps.indexOf('Variant Info') > -1 && setHaveVariants(true)
        steps.indexOf('Add on') > -1 && setHaveAddons(true)
    }, [])
    useEffect(() => {
        setDescription(temp.description ? temp.description : '')
        setName(temp.name ? temp.name : '')
    }, [temp])
    useEffect(() => {
        setVendor(managers ? managers : [])
        console.log(123)
    }, [managers])
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
                        onChange={(e) => setSpecial(e.target.checked)}
                    />
                    <label
                        className={'select-none text-[#424b56] text-[20px]'}
                        onClick={() =>
                            special ? setSpecial(false) : setSpecial(true)
                        }
                    >
                        This product special for any market?{' '}
                    </label>
                </div>
                {special && (
                    <div className={'w-[600px] ml-12'}>
                        <div className={styles.phoneOpt}>
                            <select
                                type="text"
                                className={styles.inp}
                                required={true}
                                onChange={(e) =>
                                    dispatch(
                                        setGeneralData({
                                            type: 'store_id',
                                            value: e.target.value,
                                        })
                                    )
                                }
                            >
                                {isSuccess && (
                                    <>
                                        {data.stores.map((store, i) => (
                                            <>
                                                <option
                                                    value={store}
                                                    key={`tag_${store}+${i}`}
                                                >
                                                    {store}
                                                </option>
                                            </>
                                        ))}
                                    </>
                                )}
                            </select>
                            <label className={styles.phoneL}>Store Name</label>
                        </div>
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
                    <ImgUpload file={file} setFile={setFile} />
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
                                        onChange={(e) =>
                                            dispatch(
                                                setGeneralData({
                                                    type: 'sku',
                                                    value: e.target.value,
                                                })
                                            )
                                        }
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
                                        onChange={(e) =>
                                            dispatch(
                                                setGeneralData({
                                                    type: 'barcode',
                                                    value: e.target.value,
                                                })
                                            )
                                        }
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
                                    onChange={(e) =>
                                        dispatch(
                                            setGeneralData({
                                                type: 'positionId',
                                                value: e.target.value,
                                            })
                                        )
                                    }
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
                                    onChange={(e) =>
                                        dispatch(
                                            setGeneralData({
                                                type: 'price',
                                                value: e.target.value,
                                            })
                                        )
                                    }
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
                    <Select options={vendor} className={'w-1/3 ml-12 mb-10'} />
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
                        onChange={(e) => {
                            setHaveVariants(e.target.checked)
                            e.target.checked
                                ? dispatch(addSteps('Variant Info'))
                                : dispatch(deleteSteps('Variant Info'))
                            dispatch(
                                setGeneralData({
                                    type: 'isVariants',
                                    value: e.target.checked ? 1 : 0,
                                })
                            )
                        }}
                    />
                    <label
                        className={'select-none text-[#424b56] text-[20px]'}
                        onClick={() => {
                            haveVariants
                                ? setHaveVariants(false)
                                : setHaveVariants(true)

                            haveVariants
                                ? dispatch(deleteSteps('Variant Info'))
                                : dispatch(addSteps('Variant Info'))
                            dispatch(
                                setGeneralData({
                                    type: 'isVariants',
                                    value: haveVariants ? 0 : 1,
                                })
                            )
                        }}
                    >
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
                        onChange={(e) => {
                            setHaveAddons(e.target.checked)
                            e.target.checked
                                ? dispatch(addSteps('Add on'))
                                : dispatch(deleteSteps('Add on'))
                            dispatch(
                                setGeneralData({
                                    type: 'isAddons',
                                    value: e.target.checked ? 1 : 0,
                                })
                            )
                        }}
                    />
                    <label
                        className={'select-none text-[#424b56] text-[20px]'}
                        onClick={() => {
                            haveAddons
                                ? setHaveAddons(false)
                                : setHaveAddons(true)
                            haveAddons
                                ? dispatch(deleteSteps('Add on'))
                                : dispatch(addSteps('Add on'))
                            dispatch(
                                setGeneralData({
                                    type: 'isAddons',
                                    value: haveAddons ? 0 : 1,
                                })
                            )
                        }}
                    >
                        This product has add ons
                    </label>
                </div>
            </div>
        </div>
    )
}

export default General
