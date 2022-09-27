import React, { useState } from 'react'
import NewBranchCatalogHeader from '../../headers/newBranchCatalogHeader/NewBranchCatalogHeader'
import NewBranchCatalogLanguages from '../../languages/newBranchCatalogLanguages/NewBranchCatalogLanguages'
import { useCatalogsQuery } from '../../../../store/slices/api/catalogApiSlice'
import { useLocation } from 'react-router-dom'
import Step from './step/Step'
import Controller from './controller/Controller'
import Catalogs from './steps/Catalogs'
import Review from './steps/Review'
import { useSelector } from 'react-redux'
import { selectedCatalogs } from '../../../../store/slices/branchCatalogSlice'

const NewBranchCatalog = () => {
    const location = useLocation()
    const { data, refetch } = useCatalogsQuery({
        lang: localStorage.getItem('lang'),
        rest: 'restaurants',
    })

    const [step, setStep] = useState('add')
    return (
        <div>
            <NewBranchCatalogHeader />
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

export default NewBranchCatalog
