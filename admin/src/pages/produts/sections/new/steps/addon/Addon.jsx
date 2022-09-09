import React from 'react'
import VariantStatus from '../variant/variantStatus/VariantStatus'

const Addon = () => {
    return (
        <div
            className={
                'py-10  px-12 flex justify-between items-center border-b-[1px]'
            }
        >
            <input
                type="text"
                className={
                    'text-[20px]  rounded-[4px] text-[#272727] border-[1px] border-[#c3cad1] py-3 px-4 w-2/12 mr-4 outline-none hover:border-primary hover:border-2 transition-all ease-in-out hover:text-primary '
                }
                placeholder={'Name'}
            />
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

export default Addon
