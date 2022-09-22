import React, { useEffect, useState } from 'react'
import NewProductHeader from '../../headers/newProductHeader/NewProductHeader'
import NewProductLanguages from '../../languages/newProductLanguages/NewProductLanguages'
import Step from './step/Step'
import Controller from './controller/Controller'
import General from './steps/General'
import Variants from './steps/Variants'
import Addons from './steps/Addons'
import Review from './steps/Review'
import { useDispatch } from 'react-redux'
import { deleteData } from '../../../../store/slices/productSlice'

const NewProduct = () => {
    const [active, setActive] = useState('General Info')
    const [generalFile, setGeneralFile] = useState([])
    const [allImgs, setAllImgs] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(deleteData())
    }, [])
    return (
        <>
            <NewProductHeader
                active={active}
                setActive={setActive}
                file={generalFile}
                allImgs={allImgs}
            />
            <NewProductLanguages />
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

export default NewProduct
