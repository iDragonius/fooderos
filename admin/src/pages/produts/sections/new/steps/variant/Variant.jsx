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
import CreatableSelect from 'react-select/creatable'
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
    const [defaultValues, setDefaultValues] = useState([
        {
            value: 'size',
            label: 'size',
        },
        {
            value: 'color',
            label: 'color',
        },
    ])
    const [optionsList, setOptionsList] = useState([])
    const [id, setId] = useState(0)
    const [deleteId, setDeleteId] = useState(null)
    const dispatch = useDispatch()
    const currentVariantsTypes = useSelector(currVariants)
    const [type, setType] = useState(null)
    const currentProductTypes = useSelector(productTypes)
    const [typesOptions, setTypesOptions] = useState([])
    const [name, setName] = useState()
    const addOption = () => {
        if (!name) {
            toast.warning('Choose name')
            return
        }
        if (option === '') {
            toast.warning('Option input must be full filled')
            return
        }
        if (currentVariantsTypes[name.value].indexOf(option) > -1) {
            toast.warning('You have created this option')
            return
        }
        const key =
            option +
            '__' +
            id +
            '__' +
            Array(5)
                .fill()
                .map((n) => ((Math.random() * 36) | 0).toString(36))
                .join('')
        setOptionsList(
            optionsList.concat(
                <Option
                    type={name.value}
                    value={option}
                    keyData={key}
                    setDeleted={setDeleteId}
                    del={deleteId}
                    key={key}
                />
            )
        )
        dispatch(
            addVariantsToOption({
                type: name.value,
                option,
                keyData: key,
            })
        )
        setOption('')
        setId((old) => (old = old + 1))
    }
    const [option, setOption] = useState('')
    useEffect(() => {
        setOptionsList((old) => old.filter((option) => option.key !== deleteId))
    }, [deleteId])
    return (
        <div className={'flex  relative mr-52 mb-10 mt-5'}>
            <div className={styles.tagName + ' w-1/3 ml-10 mr-20'}>
                <CreatableSelect
                    styles={customStyles}
                    onChange={(data) => {
                        if (
                            Object.keys(currentVariantsTypes).indexOf(
                                data.value
                            ) > -1
                        ) {
                            setName(name)
                            toast.warn('This name already used')
                            return
                        }
                        dispatch(
                            addVariants({
                                newName: data.value,
                                oldName: name ? name.value : '',
                            })
                        )
                        setName(data)
                    }}
                    value={name}
                    options={defaultValues}
                />
            </div>
            <div className={styles.tagName + ' w-1/3 ml-10'}>
                <div className={styles.phoneOpt}>
                    <input type="text" className={styles.inp} required={true} />
                    <label className={styles.phoneL}>Description</label>
                </div>
            </div>
            <form
                className={' w-1/3 relative'}
                onSubmit={(e) => e.preventDefault()}
            >
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
            </form>

            <button
                className={'absolute -top-2 right-0 text-[#989da2] font-medium'}
                onClick={() => {
                    if (name) {
                        dispatch(deleteOption({ name: name.value }))
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
