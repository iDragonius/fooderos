import React, { useEffect, useState } from 'react'
import Variant from './variant/Variant'
import {
    useCreateVariantsMutation,
    useProductOptionsMutation,
    useProductTypesQuery,
} from '../../../../../store/slices/api/productApiSlice'
import { useSelector } from 'react-redux'
import {
    combData,
    optionLocals,
    productTypes,
    variantLocals,
} from '../../../../../store/slices/productSlice'
import VariantList from './variant/variantList/VariantList'

const Variants = ({ allImgs, setAllImgs }) => {
    const [variantsList, setVariantsList] = useState([])
    const [variantCombinationList, setVariantCombinationList] = useState([])
    const currentProductTypes = useSelector(productTypes)
    const [typesOptions, setTypesOptions] = useState([])

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
        if (Object.keys(optionsLocals).length === 0) {
            onAdd()
        } else {
            const temp = []
            let varId = 0
            Object.keys(optionsLocals).map(() => {
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
        }
    }, [])
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
                        allImgs={allImgs}
                        setAllImgs={setAllImgs}
                    />
                </div>
            </div>
        </>
    )
}

export default Variants
