import React, { useEffect, useState } from 'react'
import Addon from './addon/Addon'

const Addons = () => {
    const [addonsList, setAddonsList] = useState([])
    const [id, setId] = useState(0)
    const addAddon = () => {
        setAddonsList(addonsList.concat(<Addon key={`${id}_azd`} />))
        setId((old) => (old = old + 1))
    }
    useEffect(() => {
        addAddon()
    }, [])
    return (
        <div
            className={'rounded-[6px]  mb-10 pb-1 w-[1500px]    '}
            style={{ boxShadow: '1px  1px 10px #cfcfcf' }}
        >
            <div className={'border-b-[1px] flex justify-between items-center'}>
                <h1 className={'text-[#1a242f] text-[24px] py-6 px-12'}>
                    Add ons
                </h1>
                <button
                    className={
                        'border-2 border-primary  text-primary rounded-[8px] py-4 mr-4 h-max px-5 text-[20px]'
                    }
                    onClick={addAddon}
                >
                    + Add Option
                </button>
            </div>
            <div
                className={
                    'px-14 flex text-[#272727] text-[20px] font-medium border-b-[1px] pb-5 pt-20'
                }
            >
                <p className={'mr-[210px]'}>Name</p>

                <p className={'mr-[230px]'}>SKU</p>
                <p className={'mr-[200px]'}> Barcode</p>
                <p className={'mr-[180px]'}>Unit Price</p>
                <p className={'mr-[180px]'}>Weight</p>
                <p>Status</p>
            </div>
            <div>{addonsList}</div>
        </div>
    )
}

export default Addons
