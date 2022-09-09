import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import styles from '../../NewProduct.module.scss'
import Option from './option/Option'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
    addVariants,
    addVariantsToOption,
    currVariants,
    deleteOption,
    productTypes,
    setCombinations,
} from '../../../../../../store/slices/productSlice'
const customStyles = {
    valueContainer: () => ({
        height: '54px',
        display: 'flex',
        alignItems: 'center',
        marginLeft: '20px',
    }),
    control: (provided) => ({
        ...provided,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        marginTop: '24px',
    }),
    placeholder: () => ({
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        color: '#31373e',
    }),
    menu: (provided) => ({
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.1)',
        position: 'absolute',
        width: '100%',
        zIndex: '1000',
    }),
}
const Variant = ({ variantKey, setDel, types }) => {
    const [optionsList, setOptionsList] = useState([])
    const [id, setId] = useState(0)
    const [deleteId, setDeleteId] = useState(null)
    const dispatch = useDispatch()
    const currentVariantsTypes = useSelector(currVariants)
    const [type, setType] = useState(null)
    const currentProductTypes = useSelector(productTypes)
    const [typesOptions, setTypesOptions] = useState([])

    const addOption = () => {
        if (!type) {
            toast.warning('Choose name')
            return
        }
        if (option === '') {
            toast.warning('Option input must be full filled')
            return
        }
        if (currentVariantsTypes[type.value].indexOf(option) > -1) {
            toast.warning('You have created this option')
            return
        }
        setOptionsList(
            optionsList.concat(
                <Option
                    value={option}
                    keyData={option + '__' + id}
                    setDeleted={setDeleteId}
                    del={deleteId}
                    type={type.value}
                    key={option + '__' + id}
                />
            )
        )
        dispatch(addVariantsToOption({ type: type.value, option }))
        setOption('')
        setId((old) => (old = old + 1))
    }
    const [option, setOption] = useState('')
    useEffect(() => {
        setOptionsList((old) => old.filter((option) => option.key !== deleteId))
    }, [deleteId])
    return (
        <div className={'flex  relative mr-52 mb-10 mt-5'}>
            <Select
                options={types}
                placeholder={'Name'}
                styles={customStyles}
                className={'ml-10 w-1/3'}
                value={type}
                onChange={(data) => {
                    if (data === type) {
                        return
                    }
                    if (
                        Object.keys(currentVariantsTypes).indexOf(data.value) >
                        -1
                    ) {
                        if (type) {
                            dispatch(deleteOption(type.value))
                        }

                        setType([])
                        return
                    }
                    if (type) {
                        dispatch(deleteOption(type.value))
                    }
                    setType(data)
                    dispatch(addVariants(data.value))

                    console.log(Object.keys(currentVariantsTypes))
                }}
            />
            <div className={styles.tagName + ' w-1/3 ml-10'}>
                <div className={styles.phoneOpt}>
                    <input type="text" className={styles.inp} required={true} />
                    <label className={styles.phoneL}>Description</label>
                </div>
            </div>
            <div className={' w-1/3 relative'}>
                <div className={styles.tagName + '  ml-10'}>
                    <div className={styles.phoneOpt}>
                        <input
                            type="text"
                            className={styles.inp}
                            required={true}
                            value={option}
                            onChange={(e) => setOption(e.target.value)}
                        />
                        <label className={styles.phoneL}>Option</label>
                    </div>
                </div>
                <div className={'flex flex-col  ml-10'}>
                    {optionsList}

                    <button
                        onClick={addOption}
                        className={
                            'self-end border-[1px] border-[#dadada] text-primary py-2 h-max text-[20px] px-5 rounded-[8px] h-max mt-8'
                        }
                    >
                        + Add option
                    </button>
                </div>
            </div>

            <button
                className={'absolute -top-2 right-0 text-[#989da2] font-medium'}
                onClick={() => {
                    console.log(types)
                    if (type) {
                        dispatch(deleteOption(type.value))
                    }
                    setDel(variantKey)
                }}
            >
                remove
            </button>
        </div>
    )
}

export default Variant
