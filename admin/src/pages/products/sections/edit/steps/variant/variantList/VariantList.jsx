import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    currCombinations,
    editVariantsData,
    newCombinationData,
} from '../../../../../../../store/slices/productSlice'
import VariantRow from './variantRow/VariantRow'

const VariantList = ({ allImgs, setAllImgs }) => {
    const currentVariantCombinations = useSelector(newCombinationData)
    const combData = useSelector(editVariantsData)
    const [data, setData] = useState([])
    useEffect(() => {
        setData(
            combData.concat(
                currentVariantCombinations ? currentVariantCombinations : []
            )
        )
    }, [currentVariantCombinations])
    return (
        <div>
            <div
                className={
                    'flex justify-end text-[#272727] text-[20px] font-medium border-b-[1px] pb-5 pt-20'
                }
            >
                <p className={'pl-4'}>SKU</p>
                <p className={'ml-[210px] pl-4'}>Barcode</p>
                <p className={' ml-[160px] pl-4'}>Unit Price</p>
                <p className={'ml-[160px]'}>Weight</p>
                <p className={'ml-[170px] mr-10 '}>Status</p>
            </div>
            <div>
                {data.map((comb, i) => (
                    <VariantRow
                        setAllImgs={setAllImgs}
                        allImgs={allImgs}
                        variants={comb.name}
                        key={`${i}_xzc123`}
                        position={i}
                        data={data}
                    />
                ))}
            </div>
        </div>
    )
}

export default VariantList
