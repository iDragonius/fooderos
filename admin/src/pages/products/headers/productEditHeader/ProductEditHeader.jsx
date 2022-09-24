import React from 'react'
import styles from '../../../tagList/headers/Header.module.scss'
import arrow from '../../../../assets/img/pages/arrow.png'
import { useDispatch, useSelector } from 'react-redux'
import {
    addonData,
    allSteps,
    editVariantsData,
    editVariantsTypes,
    generalInfo,
    localDescription,
    localNames,
    newCombinationData,
    newEditVariantOptions,
} from '../../../../store/slices/productSlice'

import { useLocation, useNavigate } from 'react-router-dom'
import {
    useProductEditAddonsMutation,
    useProductEditGeneralMutation,
    useProductEditMutation,
    useProductEditOptionsMutation,
} from '../../../../store/slices/api/productApiSlice'
import { allLangs } from '../../../../store/slices/languageSlice'

const ProductEditHeader = ({ setActive, active, file, allImgs }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const back = () => {
        navigate(`/products/${location.pathname.split('/')[2]}/list`)
    }
    const steps = useSelector(allSteps)

    const change = () => {
        const sections = ['General Info', 'Variant Info', 'Add on', 'Review']

        if (sections.indexOf(active) === 3) {
            return
        }
        setActive(steps[steps.indexOf(active) + 1])
    }
    const [generalEdit] = useProductEditGeneralMutation()
    const [addonEdit] = useProductEditAddonsMutation()
    const [optionEdit] = useProductEditOptionsMutation()
    const [variantEdit] = useProductEditMutation()
    const general = useSelector(generalInfo)
    const langs = useSelector(allLangs)
    const names = useSelector(localNames)
    const descriptions = useSelector(localDescription)
    const newOptions = useSelector(newEditVariantOptions)
    const variants = useSelector(editVariantsTypes)
    const newVariants = useSelector(newCombinationData)
    const combinations = useSelector(editVariantsData)
    const addons = useSelector(addonData)

    const save = async () => {
        await generalEdit({
            page: 'product',
            ...general,
            langs,
            ...names,
            ...descriptions,
        })
            .unwrap()
            .then(async (res) => {
                if (steps.indexOf('Variant Info') > -1) {
                    const allData = [...combinations, ...newVariants]
                    const tempImages = {}
                    Object.keys(allImgs).map((img) => {
                        const index = allData.findIndex(
                            (data) => data.name === img
                        )
                        tempImages[index] = allImgs[img]
                    })
                    if (Object.keys(newOptions).length > 0) {
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
                        await optionEdit({
                            product_id: general.id,
                            options: temp,
                            page: 'options',
                        })
                            .unwrap()
                            .then(async (res) => {
                                console.log(res)
                                await variantEdit({
                                    product_id: general.id,
                                    data: [...combinations, ...data],
                                    page: 'variants',
                                    images: tempImages,
                                })
                            })
                    } else {
                        await variantEdit({
                            product_id: general.id,
                            data: [...combinations],
                            page: 'variants',
                            images: tempImages,
                        })
                    }
                }
                if (steps.indexOf('Add on') > -1) {
                    await addonEdit({
                        addons,
                        page: 'addons',
                        product_id: general.id,
                    })
                }
            })
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <div className={styles.name} onClick={back}>
                        <h1 className={styles.section}>
                            <img src={arrow} alt="arrow" />
                        </h1>
                        <h1 className={styles.section}> New Product</h1>
                    </div>

                    <div className={styles.btns}>
                        {active === 'Review' ? (
                            <button
                                className={styles.tag + ' ' + styles.btn}
                                onClick={save}
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                className={styles.tag + ' ' + styles.btn}
                                onClick={change}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductEditHeader
