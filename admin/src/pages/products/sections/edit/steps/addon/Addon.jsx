import React, { useEffect, useState } from 'react'
import VariantStatus from '../variant/variantStatus/VariantStatus'
import AddonStatus from './addonStatus/AddonStatus'
import { useDispatch, useSelector } from 'react-redux'
import {
    addonData,
    setAddonData,
    setAllAddonData,
} from '../../../../../../store/slices/productSlice'

const Addon = ({ id, old }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [sku, setSku] = useState('')
    const [weight, setWeight] = useState('')
    const [barcode, setBarcode] = useState('')
    const [status, setStatus] = useState(true)
    const dispatch = useDispatch()
    const addons = useSelector(addonData)
    useEffect(() => {
        console.log(id)
        if (old) {
            setName(addons[id]?.Az_name)
            setPrice(addons[id]?.price)
            setStatus(addons[id]?.status === 1)
            setSku(addons[id]?.sku)
            setWeight(addons[id]?.weight)
            setBarcode(addons[id]?.barcode)
        } else {
            dispatch(
                setAllAddonData({
                    name,
                    price,
                    sku,
                    weight,
                    limit: 1,
                    barcode,
                    status,
                    id,
                })
            )
        }
    }, [])
    return (
        <div
            className={
                'py-10  px-12 flex justify-between items-center border-b-[1px]'
            }
        >
            <input
                type="text"
                className={
                    'text-[20px]  rounded-[4px] text-[#272727] border-[1px] border-[#c3cad1] py-3 px-4 w-2/12 mr-4 outline-none hover:border-primary hover:border-2 transition-all ease-in-out hover:text-primary '
                }
                placeholder={'Name'}
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                    dispatch(
                        setAddonData({
                            id,
                            type: 'Az_name',
                            value: e.target.value,
                        })
                    )
                    dispatch(
                        setAddonData({
                            id,
                            type: 'Ru_name',
                            value: e.target.value,
                        })
                    )
                    dispatch(
                        setAddonData({
                            id,
                            type: 'En_name',
                            value: e.target.value,
                        })
                    )
                }}
            />
            <input
                type="text"
                className={
                    'text-[20px] rounded-[4px] text-[#272727] border-[1px] border-[#c3cad1] py-3 px-4 w-2/12 mr-4 outline-none hover:border-primary hover:border-2 transition-all ease-in-out hover:text-primary '
                }
                placeholder={'SKU'}
                value={sku}
                onChange={(e) => {
                    setSku(e.target.value)
                    dispatch(
                        setAddonData({ id, type: 'sku', value: e.target.value })
                    )
                }}
            />
            <input
                type="text"
                className={
                    'text-[20px]  rounded-[4px] text-[#272727] border-[1px] border-[#c3cad1] py-3 px-4 w-2/12 mr-4 outline-none hover:border-primary hover:border-2 transition-all ease-in-out hover:text-primary '
                }
                placeholder={'Barcode'}
                value={barcode}
                onChange={(e) => {
                    setBarcode(e.target.value)
                    dispatch(
                        setAddonData({
                            id,
                            type: 'barcode',
                            value: e.target.value,
                        })
                    )
                }}
            />
            <input
                type="text"
                className={
                    'text-[20px]  rounded-[4px] text-[#272727] border-[1px] border-[#c3cad1] py-3 px-4  w-2/12 mr-4 outline-none hover:border-primary hover:border-2 transition-all ease-in-out hover:text-primary '
                }
                placeholder={'Unit Price'}
                value={price}
                onChange={(e) => {
                    setPrice(e.target.value)
                    dispatch(
                        setAddonData({
                            id,
                            type: 'price',
                            value: e.target.value,
                        })
                    )
                }}
            />
            <input
                type="text"
                className={
                    'text-[20px]  rounded-[4px] text-[#272727] border-[1px] border-[#c3cad1] py-3 px-4  w-2/12 mr-4 outline-none hover:border-primary hover:border-2 transition-all ease-in-out hover:text-primary '
                }
                placeholder={'Weight'}
                value={weight}
                onChange={(e) => {
                    setWeight(e.target.value)
                    dispatch(
                        setAddonData({
                            id,
                            type: 'weight',
                            value: e.target.value,
                        })
                    )
                }}
            />
            <AddonStatus checked={true} setStatus={setStatus} id={id} />
        </div>
    )
}

export default Addon
