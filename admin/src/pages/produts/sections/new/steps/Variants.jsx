import React, { useState } from 'react'
import styles from '../NewProduct.module.scss'
import Variant from './variant/Variant'

const Variants = () => {
    const [variantsList, setVariantsList] = useState([])
    let [variantId, setVariantId] = useState(0)
    const onAdd = () => {
        setVariantsList(variantsList.concat(<Variant key={variantId} />))
        setVariantId((old) => old + 1)
        console.log(variantId)
    }

    return (
        <div
            className={'rounded-[6px]  mb-10 pb-1    '}
            style={{ boxShadow: '1px  1px 10px #cfcfcf' }}
        >
            <div className={'border-b-[1px] flex justify-between items-center'}>
                <h1 className={'text-[#1a242f] text-[24px] py-6 px-12'}>
                    Varinat Info
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
            <div>
                <Variant />
                {variantsList}
            </div>
        </div>
    )
}

export default Variants
