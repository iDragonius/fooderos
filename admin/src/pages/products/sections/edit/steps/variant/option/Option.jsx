import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addLocalsToOption,
    changeCombinationLang,
    currLang,
    deleteOptions,
    optionLocals,
} from '../../../../../../../store/slices/productSlice'

const Option = ({ value, type, keyData, setDeleted, old }) => {
    const dispatch = useDispatch()
    const [val, setVal] = useState(value)
    const lang = useSelector(currLang)
    const locals = useSelector(optionLocals)

    // useEffect(() => {
    //     if (locals[type][keyData]) {
    //         setVal(locals[type][keyData][`${lang}_name`])
    //         dispatch(changeCombinationLang())
    //     }
    // }, [lang])
    return (
        <div className={'relative'}>
            <input
                className={
                    old
                        ? 'bg-gray-200 flex items-center justify-between mt-6 py-3 px-5 rounded-[8px] outline-none w-full'
                        : ' flex items-center justify-between mt-6 py-3 px-5 rounded-[8px] outline-none w-full'
                }
                disabled={old}
                style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                key={keyData}
                value={val}
                onChange={(e) => setVal(e.target.value)}
            />
            <span
                className={
                    'text-[#96a2af] font-bold text-[20px] cursor-pointer absolute top-8  right-12 '
                }
                onClick={() => {
                    // dispatch(deleteOptions({ branch: type, value: value }))
                    // setDeleted(keyData)
                    if (old) {
                        return
                    }
                    dispatch(
                        addLocalsToOption({ lang, option: val, keyData, type })
                    )
                }}
            >
                +
            </span>
            <span
                className={
                    'text-[#96a2af] font-bold text-[20px] cursor-pointer absolute top-8  right-5 '
                }
                onClick={() => {
                    if (old) {
                        return
                    }
                    dispatch(
                        deleteOptions({ branch: type, value: value, keyData })
                    )
                    setDeleted(keyData)
                }}
            >
                x
            </span>
        </div>
    )
}

export default Option
