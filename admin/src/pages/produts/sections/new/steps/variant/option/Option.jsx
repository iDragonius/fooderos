import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteOptions } from '../../../../../../../store/slices/productSlice'

const Option = ({ value, type, keyData, setDeleted }) => {
    const dispatch = useDispatch()

    return (
        <div
            className={
                'flex items-center justify-between mt-6 py-3 px-5 rounded-[8px] '
            }
            style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
            key={keyData}
        >
            <p>{value}</p>
            <span
                className={
                    'text-[#96a2af] font-bold text-[20px] cursor-pointer'
                }
                onClick={() => {
                    dispatch(deleteOptions({ branch: type, value: value }))
                    setDeleted(keyData)
                }}
            >
                x
            </span>
        </div>
    )
}

export default Option
