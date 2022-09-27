import React, { useEffect, useState } from 'react'
import Step from './step/Step'
import Catalogs from './steps/Catalogs'
import Review from './steps/Review'
import Controller from './controller/Controller'
import BranchCatalogEditHeader from '../../headers/branchCatalogEditHeader/BranchCatalogEditHeader'
import { useLocation } from 'react-router-dom'
import { useCatalogsQuery } from '../../../../store/slices/api/catalogApiSlice'
import { useShowBranchCatalogsQuery } from '../../../../store/slices/api/branchCatalogApiSlice'

const BranchCatalogEdit = () => {
    const location = useLocation()
    const { data, refetch } = useCatalogsQuery({
        lang: localStorage.getItem('lang'),
        rest: 'restaurants',
    })
    const { data: show, isSuccess } = useShowBranchCatalogsQuery({
        lang: localStorage.getItem('lang'),
        id: localStorage.getItem('store_id'),
    })
    useEffect(() => {
        refetch()
    }, [])
    const [step, setStep] = useState('add')
    return (
        <div>
            <BranchCatalogEditHeader />
            <Step active={step} />
            <div className={'bg-[#f4f5f9] p-10'}>
                {step === 'add' && <Catalogs />}
                {step === 'review' && <Review />}
                <div className={' mt-12'}>
                    <Controller active={step} setActive={setStep} />
                </div>
            </div>
        </div>
    )
}

export default BranchCatalogEdit
