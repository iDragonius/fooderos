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
    useProductOptionsMutation,
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
    const general = useSelector(generalInfo)
    const combinations = useSelector(editVariantsData)
    const [edit] = useProductEditMutation()
    const [createOptions] = useProductEditOptionsMutation()
    const newOptions = useSelector(newEditVariantOptions)
    const variants = useSelector(editVariantsTypes)
    const newVariants = useSelector(newCombinationData)
    const editVariant = async () => {
        console.log(Object.keys(newOptions))
        if (Object.keys(newOptions).length > 0) {
            console.log(123)
            const temp = {}
            Object.keys(newOptions).map((option, k) => {
                temp[k] = {}
                temp[k].id = variants[Number(option)].id
                temp[k].values = {}
                newOptions[option].map((opt, i) => {
                    temp[k].values[i] = {
                        Az_name: opt,
                        En_name: opt,
                        Ru_name: opt,
                    }
                })
            })
            console.log(temp)
            const data = []
            newVariants.map((newVar) => {
                let names = []
                newVar.name.split(',').map((name) => {
                    names.push(name)
                })
                data.push({
                    options: names,

                    sku: newVar.sku,
                    barcode: newVar.barcode,
                    price: newVar.price,
                    status: newVar.status,
                    weight: newVar.weight,
                })
            })
            console.log(data)
            await createOptions({
                product_id: general.id,
                options: temp,
                page: 'options',
            })
                .unwrap()
                .then(async (res) => {
                    await edit({
                        product_id: general.id,
                        data: [...combinations, ...data],
                        page: 'variants',
                        images: allImgs,
                    })
                })
        } else {
            await edit({
                product_id: general.id,
                data: [...combinations],
                page: 'variants',
                images: allImgs,
            })
        }
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
                    <button onClick={editVariant}>save</button>
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
