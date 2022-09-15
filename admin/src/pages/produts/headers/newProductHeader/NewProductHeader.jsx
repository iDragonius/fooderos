import React, { useEffect } from 'react'
import styles from '../../../tagList/headers/Header.module.scss'
import arrow from '../../../../assets/img/pages/arrow.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    addonData,
    allSteps,
    checkProductData,
    combData,
    destroyStatus,
    generalInfo,
    localDescription,
    localNames,
    optionLocals,
    productStatus,
    productTypes,
    setProductLocales,
    variantLocals,
} from '../../../../store/slices/productSlice'
import {
    useCreateProductMutation,
    useCreateVariantsMutation,
    useProductAddonsMutation,
    useProductOptionsMutation,
} from '../../../../store/slices/api/productApiSlice'
import { allLangs } from '../../../../store/slices/storeSlice'

const NewProductHeader = ({ setActive, active, file, allImgs }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const back = () => {
        navigate(`/products/${location.pathname.split('/')[2]}/list`)
    }
    const steps = useSelector(allSteps)
    const status = useSelector(productStatus)
    const data = useSelector(generalInfo)
    const names = useSelector(localNames)
    const descriptions = useSelector(localDescription)
    const langs = useSelector(allLangs)
    const [optionCreate] = useProductOptionsMutation()
    const [variantCreate] = useCreateVariantsMutation()
    const optionsLocal = useSelector(optionLocals)
    const variantsLocal = useSelector(variantLocals)

    const combinationData = useSelector(combData)
    const [create] = useCreateProductMutation()
    const [addonCreate] = useProductAddonsMutation()
    const addonsData = useSelector(addonData)
    useEffect(() => {
        if (status) {
            createProduct()
        }
        return destroy()
    }, [status])
    const destroy = () => {
        dispatch(destroyStatus())
    }
    const createProduct = async () => {
        await create({
            ...data,
            ...names,
            ...descriptions,
            langs,
            image: file[0],
            rest: location.pathname.split('/')[2],
        })
            .unwrap()
            .then(async (res) => {
                if (steps.indexOf('Variant Info') > -1) {
                    const temp = {}
                    Object.keys(variantsLocal).map((variant, i) => {
                        temp[i] = {}
                        temp[i].option = {
                            ...variantsLocal[variant],
                        }
                        temp[i].values = {}

                        Object.keys(optionsLocal[variant]).map((option, k) => {
                            temp[i].values[k] = {
                                ...optionsLocal[variant][option],
                            }
                        })
                    })
                    console.log(temp)
                    await optionCreate({
                        product_id: res.product_id,
                        options: temp,
                    })
                        .unwrap()
                        .then(async () => {
                            const data = []
                            Object.keys(combinationData).map((combination) => {
                                let tempData = {}
                                let names = []
                                combination.split(',').map((name) => {
                                    names.push(name)
                                })
                                tempData.options = [...names]
                                tempData.data = {
                                    sku: combinationData[combination].sku,
                                    barcode:
                                        combinationData[combination].barcode,
                                    status: combinationData[combination].status
                                        ? 1
                                        : 0,
                                    weight: combinationData[combination].weight,
                                    price: combinationData[combination].price,
                                }
                                data.push(tempData)
                            })
                            console.log(data)
                            await variantCreate({
                                data,
                                images: allImgs,
                                id: res.product_id,
                            })
                        })
                }
                if (steps.indexOf('Add on')) {
                    console.log(addonsData)
                    await addonCreate({
                        addons: addonsData,
                        product_id: res.product_id,
                    })
                }
            })
    }
    const change = () => {
        const sections = ['General Info', 'Variant Info', 'Add on', 'Review']

        if (sections.indexOf(active) === 3) {
            return
        }
        setActive(steps[steps.indexOf(active) + 1])
    }
    const handleData = async (e) => {
        e.preventDefault()
        dispatch(setProductLocales())
        dispatch(checkProductData())
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
                                onClick={handleData}
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

export default NewProductHeader
