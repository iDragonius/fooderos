import React, { useEffect, useState } from 'react'
import VariantImg from '../variantImg/VariantImg'
import VariantStatus from '../../variantStatus/VariantStatus'
import { useDispatch, useSelector } from 'react-redux'
import {
    combData,
    currCombinations,
    editVariantsData,
    setAllCombinationData,
    setCombinationData,
    setNewCombinationData,
} from '../../../../../../../../store/slices/productSlice'

const VariantRow = ({ variants, setAllImgs, allImgs, position, data }) => {
    const [variant, setVariant] = useState('')
    const [sku, setSku] = useState('')
    const [barcode, setBarcode] = useState('')
    const [price, setPrice] = useState('')
    const [weight, setWeight] = useState('')
    const [status, setStatus] = useState(true)
    const combinations = useSelector(currCombinations)
    const [file, setFile] = useState([])
    // const combination = useSelector(combData)
    const combData = useSelector(editVariantsData)

    const dispatch = useDispatch()
    useEffect(() => {
        const temp = data.find((data) => data.name === variants)
        setPrice(temp.price)
        setStatus(temp.status === 1)
        setBarcode(temp.barcode)
        setSku(temp.sku)
        setWeight(temp.weight)
    }, [data])

    return (
        <div className={'py-2 border-b-[1px] pl-14 flex items-center'}>
            <VariantImg
                path={data[position]?.id ? data[position].image : ''}
                id={variants}
                file={file}
                setFile={setFile}
                setAllImgs={setAllImgs}
                allImgs={allImgs}
                position={position}
            />
            <div className={'ml-8 w-[180px]'}>
                {variants.split(',').map((i) => (
                    <div className={'mb-2'}>{i}</div>
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
                    if (data[position]?.id) {
                        dispatch(
                            setCombinationData({
                                name: variants,
                                type: 'sku',
                                value: e.target.value,
                            })
                        )
                    } else {
                        dispatch(
                            setNewCombinationData({
                                name: data[position].name,
                                type: 'sku',
                                value: e.target.value,
                            })
                        )
                    }
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
                    if (data[position]?.id) {
                        dispatch(
                            setCombinationData({
                                name: variants,
                                type: 'barcode',
                                value: e.target.value,
                            })
                        )
                    } else {
                        dispatch(
                            setNewCombinationData({
                                name: data[position].name,
                                type: 'barcode',
                                value: e.target.value,
                            })
                        )
                    }
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

                    if (data[position]?.id) {
                        console.log(variants)
                        dispatch(
                            setCombinationData({
                                name: variants,
                                type: 'price',
                                value: e.target.value,
                            })
                        )
                    } else {
                        dispatch(
                            setNewCombinationData({
                                name: data[position].name,
                                type: 'price',
                                value: e.target.value,
                            })
                        )
                    }
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

                    if (data[position]?.id) {
                        dispatch(
                            setCombinationData({
                                name: variants,
                                type: 'weight',
                                value: e.target.value,
                            })
                        )
                    } else {
                        dispatch(
                            setNewCombinationData({
                                name: data[position].name,
                                type: 'weight',
                                value: e.target.value,
                            })
                        )
                    }
                }}
            />
            <VariantStatus
                checked={true}
                id={variants}
                old={data[position]?.id}
                setStatus={setStatus}
            />
        </div>
    )
}

export default React.memo(VariantRow)
