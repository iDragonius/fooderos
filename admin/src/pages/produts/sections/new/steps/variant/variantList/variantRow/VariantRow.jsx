import React, { useEffect, useState } from 'react'
import VariantImg from '../variantImg/VariantImg'
import VariantStatus from '../../variantStatus/VariantStatus'

const VariantRow = ({ variants }) => {
    const [variant, setVariant] = useState('')
    useEffect(() => {
        variants.map((temp) => {
            setVariant((old) => (old = old + temp))
        })
    }, [])
    const [file, setFile] = useState([])
    return (
        <div className={'py-2 border-b-[1px] pl-14 flex items-center'}>
            <VariantImg
                file={file}
                setFile={setFile}
                key={Array(5)
                    .fill()
                    .map((n) => ((Math.random() * 36) | 0).toString(36))
                    .join('')}
            />
            <div className={'ml-8 w-[180px]'}>
                {variants.map((variant) => (
                    <p className={'text-[16px] mb-2 text-[#272727]'}>
                        {variant}
                    </p>
                ))}
            </div>
            <input
                type="text"
                className={
                    'text-[20px] rounded-[4px] text-[#272727] border-[1px] border-[#c3cad1] py-3 px-4 w-2/12 mr-4 outline-none hover:border-primary hover:border-2 transition-all ease-in-out hover:text-primary '
                }
                placeholder={'SKU'}
            />
            <input
                type="text"
                className={
                    'text-[20px]  rounded-[4px] text-[#272727] border-[1px] border-[#c3cad1] py-3 px-4 w-2/12 mr-4 outline-none hover:border-primary hover:border-2 transition-all ease-in-out hover:text-primary '
                }
                placeholder={'Barcode'}
            />
            <input
                type="text"
                className={
                    'text-[20px]  rounded-[4px] text-[#272727] border-[1px] border-[#c3cad1] py-3 px-4  w-2/12 mr-4 outline-none hover:border-primary hover:border-2 transition-all ease-in-out hover:text-primary '
                }
                placeholder={'Unit Price'}
            />
            <input
                type="text"
                className={
                    'text-[20px]  rounded-[4px] text-[#272727] border-[1px] border-[#c3cad1] py-3 px-4  w-2/12 mr-4 outline-none hover:border-primary hover:border-2 transition-all ease-in-out hover:text-primary '
                }
                placeholder={'Weight'}
            />
            <VariantStatus checked={true} />
        </div>
    )
}

export default VariantRow
