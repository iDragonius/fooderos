import React, { useEffect, useState } from 'react'
import Variant from './variant/Variant'

import { useSelector } from 'react-redux'
import {
    editVariantsData,
    editVariantsTypes,
    generalInfo,
    newCombinationData,
    newEditVariantOptions,
    optionLocals,
    productTypes,
} from '../../../../../store/slices/productSlice'
import VariantList from './variant/variantList/VariantList'
import {
    useProductEditMutation,
    useProductEditOptionsMutation,
} from '../../../../../store/slices/api/productApiSlice'

const Variants = ({ allImgs, setAllImgs }) => {
    const [variantsList, setVariantsList] = useState([])
    const [variantCombinationList, setVariantCombinationList] = useState([])
    const currentProductTypes = useSelector(productTypes)
    const [typesOptions, setTypesOptions] = useState([])
    const variantsData = useSelector(editVariantsTypes)
    const [variantId, setVariantId] = useState(0)
    const [variantDelete, setVariantDelete] = useState(null)
    const optionsLocals = useSelector(optionLocals)
    const onAdd = () => {
        setVariantsList(
            variantsList.concat(
                <Variant
                    key={variantId + 'xyz012'}
                    variantKey={variantId + 'xyz012'}
                    setDel={setVariantDelete}
                />
            )
        )
        setVariantId((old) => old + 1)
    }

    useEffect(() => {
        const temp = []
        let varId = 0
        variantsData.map(() => {
            temp.push(
                <Variant
                    i={varId}
                    key={varId + 'xyz012'}
                    variantKey={varId + 'xyz012'}
                    setDel={setVariantDelete}
                />
            )
            varId++
        })
        setVariantsList(variantsList.concat(temp))
        setVariantId(varId)
    }, [variantsData])
    useEffect(() => {
        setVariantsList((old) =>
            old.filter((variant) => variant.key !== variantDelete)
        )
    }, [variantDelete])
    useEffect(() => {
        setTypesOptions(currentProductTypes ? currentProductTypes : [])
    }, [currentProductTypes])
    return (
        <>
            <div
                className={'rounded-[6px]  mb-10 pb-1    w-[1500px] '}
                style={{ boxShadow: '1px  1px 10px #cfcfcf' }}
            >
                <div
                    className={
                        'border-b-[1px] flex justify-between items-center'
                    }
                >
                    <h1 className={'text-[#1a242f] text-[24px] py-6 px-12'}>
                        Variant Info
                    </h1>
                </div>
                <div>{variantsList}</div>
            </div>
            <div
                className={'rounded-[6px]  mb-10 pb-1   w-[1500px] '}
                style={{ boxShadow: '1px  1px 10px #cfcfcf' }}
            >
                <div
                    className={
                        'border-b-[1px] flex justify-between items-center'
                    }
                >
                    <h1 className={'text-[#1a242f] text-[24px] py-6 px-12'}>
                        Variant Combination
                    </h1>
                </div>

                <div>
                    <VariantList
                        variantCombinationList={variantCombinationList}
                        allImgs={allImgs}
                        setAllImgs={setAllImgs}
                    />
                </div>
            </div>
        </>
    )
}

export default Variants
