import React, { useState } from 'react'
import styles from './Step.modul.scss'
const Step = ({ active, setActive }) => {
    return (
        <div className={'flex items-center flex-col'}>
            <div
                className={
                    '  mt-14 w-[800px] relative flex justify-between items-center'
                }
            >
                <div className={'flex flex-col items-center'}>
                    <div
                        className={
                            active === 'General Info'
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
                            active === 'Variant Info'
                                ? 'w-8 h-8  rounded-full border-[1px] border-primary flex justify-center items-center text-[15px]  text-primary font-bold   '
                                : 'w-8 h-8  rounded-full border-[1px] border-gray-100 flex justify-center items-center text-[12px] bg-gray-200 text-white font-bold   '
                        }
                    >
                        2
                    </div>
                </div>
                <div className={'w-[200px] h-[1px] bg-[#e2e3e4]'} />
                <div className={'flex flex-col items-center'}>
                    <div
                        className={
                            active === 'Add on'
                                ? 'w-8 h-8  rounded-full border-[1px] border-primary flex justify-center items-center text-[15px]  text-primary font-bold   '
                                : 'w-8 h-8  rounded-full border-[1px] border-gray-100 flex justify-center items-center text-[12px] bg-gray-200 text-white font-bold   '
                        }
                    >
                        3
                    </div>
                </div>
                <div className={'w-[200px] h-[1px] bg-[#e2e3e4]'} />
                <div className={'flex flex-col items-center'}>
                    <div
                        className={
                            active === 'Review'
                                ? 'w-8 h-8  rounded-full border-[1px] border-primary flex justify-center items-center text-[15px]  text-primary font-bold   '
                                : 'w-8 h-8  rounded-full border-[1px] border-gray-100 flex justify-center items-center text-[12px] bg-gray-200 text-white font-bold   '
                        }
                    >
                        4
                    </div>
                </div>
            </div>
            <div className={'  mt-4 w-[850px] relative flex  mb-8  '}>
                <div
                    className={
                        active === 'General Info'
                            ? 'mr-[165px]   text-[16px] font-medium'
                            : 'mr-[165px]   text-[16px]'
                    }
                >
                    General Info
                </div>
                <div
                    className={
                        active === 'Variant Info'
                            ? 'mr-[185px]   text-[16px] font-medium'
                            : 'mr-[185px]   text-[16px]'
                    }
                >
                    Variant Info
                </div>
                <div
                    className={
                        active === 'Add on'
                            ? 'mr-[205px]   text-[16px] font-medium'
                            : 'mr-[205px]   text-[16px]'
                    }
                >
                    Add on
                </div>
                <div
                    className={
                        active === 'Review'
                            ? 'text-[16px] font-medium'
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
