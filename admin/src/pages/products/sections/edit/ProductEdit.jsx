import React, { useEffect, useState } from 'react'
import { useShowProductQuery } from '../../../../store/slices/api/productApiSlice'
import { useLocation } from 'react-router-dom'
import Step from './step/Step'
import General from './steps/General'
import Variants from './steps/Variants'
import Addons from './steps/Addons'
import Review from './steps/Review'
import Controller from './controller/Controller'
import { useDispatch } from 'react-redux'
import { deleteData } from '../../../../store/slices/productSlice'
import ProductEditHeader from '../../headers/productEditHeader/ProductEditHeader'
import ProductEditLanguages from '../../languages/productEditLanguages/ProductEditLanguages'

const ProductEdit = () => {
    const location = useLocation()
    const { data, refetch } = useShowProductQuery(
        location.pathname.split('/')[4]
    )
    const [active, setActive] = useState('General Info')
    const [generalFile, setGeneralFile] = useState([])
    const [allImgs, setAllImgs] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(allImgs)
    }, [allImgs])
    useEffect(() => {
        dispatch(deleteData())
        refetch()
    }, [])
    return (
        <>
            <ProductEditHeader
                file={generalFile}
                setActive={setActive}
                active={active}
                allImgs={allImgs}
            />
            <ProductEditLanguages />
            <Step active={active} setActive={setActive} />
            <div className={'p-10'}>
                {active === 'General Info' && (
                    <General file={generalFile} setFile={setGeneralFile} />
                )}
                {active === 'Variant Info' && (
                    <Variants allImgs={allImgs} setAllImgs={setAllImgs} />
                )}
                {active === 'Add on' && <Addons />}
                {active === 'Review' && <Review file={generalFile} />}

                <Controller active={active} setActive={setActive} />
            </div>
        </>
    )
}

export default ProductEdit
