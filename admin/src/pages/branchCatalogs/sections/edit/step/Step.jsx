import React from 'react'

const Step = ({ active }) => {
    return (
        <div className={'flex items-center flex-col'}>
            <div
                className={
                    '  mt-14 w-[300px] relative flex justify-between items-center'
                }
            >
                <div className={'flex flex-col items-center'}>
                    <div
                        className={
                            active === 'add'
                                ? 'w-8 h-8  rounded-full border-[1px] border-primary flex justify-center items-center text-[15px]  text-primary font-bold   '
                                : 'w-8 h-8  rounded-full border-[1px] border-gray-100 flex justify-center items-center text-[12px] bg-gray-200 text-white font-bold   '
                        }
                    >
                        1
                    </div>
                </div>
                <div className={'w-[200px] h-[1px] bg-[#e2e3e4]'} />
                <div className={'flex flex-col items-center'}>
                    <div
                        className={
                            active === 'review'
                                ? 'w-8 h-8  rounded-full border-[1px] border-primary flex justify-center items-center text-[15px]  text-primary font-bold   '
                                : 'w-8 h-8  rounded-full border-[1px] border-gray-100 flex justify-center items-center text-[12px] bg-gray-200 text-white font-bold   '
                        }
                    >
                        2
                    </div>
                </div>
            </div>
            <div className={'  mt-4 w-[370px] relative flex  mb-8  '}>
                <div
                    className={
                        active === 'General Info'
                            ? 'mr-[100px]  text-[16px] font-medium w-max'
                            : 'mr-[200px]   text-[16px] w-max'
                    }
                >
                    Add Catalog
                </div>
                <div
                    className={
                        active === 'Variant Info'
                            ? '  text-[16px] font-medium'
                            : '   text-[16px]'
                    }
                >
                    Review
                </div>
            </div>
        </div>
    )
}

export default Step
