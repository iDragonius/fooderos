import React, { useEffect, useState } from 'react'
import VariantImg from '../variantImg/VariantImg'
import VariantStatus from '../../variantStatus/VariantStatus'
import { useDispatch, useSelector } from 'react-redux'
import {
    combData,
    currCombinations,
    setAllCombinationData,
    setCombinationData,
} from '../../../../../../../../store/slices/productSlice'

const VariantRow = ({ variants, setAllImgs, allImgs, position }) => {
    const [variant, setVariant] = useState('')
    const [sku, setSku] = useState('')
    const [barcode, setBarcode] = useState('')
    const [price, setPrice] = useState('')
    const [weight, setWeight] = useState('')
    const [status, setStatus] = useState(true)
    const combinations = useSelector(currCombinations)
    const [file, setFile] = useState([])
    const combination = useSelector(combData)

    const dispatch = useDispatch()
    useEffect(() => {
        variants.map((temp) => {
            setVariant((old) => (old = old + temp))
        })
        let variant = ''
        variants.map((i) => {
            variant = variant + ',' + i
        })
        variant = variant.slice(1)
    }, [])
    useEffect(() => {
        dispatch(
            setAllCombinationData({
                name: variants,
                status,
                sku,
                barcode,
                weight,
                price,
            })
        )
        setSku(combination[variants]?.sku)
        setBarcode(combination[variants]?.barcode)
        setPrice(combination[variants]?.price)
        setWeight(combination[variants]?.weight)
        setStatus(combination[variants]?.status)
    }, [combinations])
    return (
        <div className={'py-2 border-b-[1px] pl-14 flex items-center'}>
            <VariantImg
                id={variants}
                file={file}
                setFile={setFile}
                setAllImgs={setAllImgs}
                allImgs={allImgs}
                position={position}
            />
            <div className={'ml-8 w-[180px]'}>
                {variants.map((variant) => (
                    <p className={'text-[16px] mb-2 text-[#272727]'}>
                        {variant}
                    </p>
                ))}
            </div>
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
                        setCombinationData({
                            name: variants,
                            type: 'sku',
                            value: e.target.value,
                        })
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
                        setCombinationData({
                            name: variants,
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
                        setCombinationData({
                            name: variants,
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
                    dispatch(
                        setCombinationData({
                            name: variants,
                            type: 'weight',
                            value: e.target.value,
                        })
                    )
                    setWeight(e.target.value)
                }}
            />
            <VariantStatus
                checked={status}
                id={variants}
                setStatus={setStatus}
            />
        </div>
    )
}

export default React.memo(VariantRow)
