import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { currCombinations } from '../../../../../../../store/slices/productSlice'
import VariantRow from './variantRow/VariantRow'

const VariantList = () => {
    const currentVariantCombinations = useSelector(currCombinations)

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
                {currentVariantCombinations.map((comb, i) => (
                    <VariantRow variants={comb} key={`${i}_xzc123`} />
                ))}
            </div>
        </div>
    )
}

export default VariantList
