import React, { useEffect, useState } from 'react'
import Variant from './variant/Variant'
import { useProductTypesQuery } from '../../../../../store/slices/api/productApiSlice'
import { useSelector } from 'react-redux'
import { productTypes } from '../../../../../store/slices/productSlice'
import VariantList from './variant/variantList/VariantList'

const Variants = () => {
    const [variantsList, setVariantsList] = useState([])
    const [variantCombinationList, setVariantCombinationList] = useState([])
    const currentProductTypes = useSelector(productTypes)
    const [typesOptions, setTypesOptions] = useState([])

    const [variantId, setVariantId] = useState(0)
    const [variantDelete, setVariantDelete] = useState(null)
    const { data, isSuccess } = useProductTypesQuery()
    const onAdd = () => {
        if (variantsList.length === currentProductTypes.length) {
            return
        }
        setVariantsList(
            variantsList.concat(
                <Variant
                    key={variantId + 'xyz012'}
                    types={currentProductTypes}
                    variantKey={variantId + 'xyz012'}
                    setDel={setVariantDelete}
                />
            )
        )
        setVariantId((old) => old + 1)
    }
    useEffect(() => {
        if (isSuccess) {
            onAdd()
        }
    }, [isSuccess])
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
                    <button
                        className={
                            'border-2 border-primary text-primary rounded-[8px] py-4 mr-4 h-max px-5 text-[20px]'
                        }
                        onClick={onAdd}
                    >
                        + Add another Variant
                    </button>
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
                    />
                </div>
            </div>
        </>
    )
}

export default Variants
