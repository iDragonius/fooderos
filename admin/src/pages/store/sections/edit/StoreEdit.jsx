import React, { useState } from 'react'
import { useShowStoreQuery } from '../../../../store/slices/api/storeApiSlice'
import { useLocation } from 'react-router-dom'
import StoreEditHeader from '../../headers/storeEditHeader/StoreEditHeader'
import StoreEditLanguages from '../../languages/storeEditLanguages/StoreEditLanguages'
import ImgUpload from '../new/imgUpload/ImgUpload'
import { useSelector } from 'react-redux'
import { currStore } from '../../../../store/slices/storeSlice'
import styles from '../new/NewStore.module.scss'
import Select from 'react-select'

const customStyles = {
    valueContainer: () => ({
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        width: '200px',
        marginLeft: '20px',
    }),
    control: (provided) => ({
        ...provided,
        border: '1px solid rgba(0, 0, 0, 0.1)',
    }),
    placeholder: () => ({
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        color: '#31373e',
    }),
    multiValue: () => ({
        display: 'flex',
        background: '#f1f4fa',
        alignItems: 'center',
        height: 'max-content',
        marginRight: '5px',
    }),
    multiValueLabel: () => ({
        fontSize: '15px',
        paddingLeft: '8px',
        paddingBlock: '5px',
        paddingRight: '3px',
        color: '#858c99',
    }),
}
const StoreEdit = () => {
    const location = useLocation()
    const [file, setFile] = useState([])
    const { data, isSuccess } = useShowStoreQuery(
        location.pathname.split('/')[4]
    )
    const currentStore = useSelector(currStore)

    return (
        <>
            <StoreEditHeader />
            <StoreEditLanguages />
            <div className={'ml-10 mt-8 flex'}>
                <ImgUpload
                    file={file}
                    setFile={setFile}
                    path={currentStore.image}
                />
                <div className={'ml-8'}>
                    <div>
                        <div className={styles.phoneOpt}>
                            <input
                                type="text"
                                className={styles.inp}
                                required={true}
                            />
                            <label className={styles.phoneL}>
                                Restaurant Name
                            </label>
                        </div>
                    </div>

                    <Select
                        isMulti={true}
                        styles={customStyles}
                        placeholder={'Choose tags'}
                        className={styles.selectBtn}
                    />

                    <Select
                        styles={customStyles}
                        placeholder={'Account Manager'}
                        className={styles.selectBtn}
                    />
                    <div className={styles.tagName}>
                        <div className={styles.phoneOpt}>
                            <input
                                type="text"
                                className={styles.inp}
                                required={true}
                            />
                            <label className={styles.phoneL}>
                                Delivery Cost
                            </label>
                        </div>
                    </div>
                    <div className={styles.tagName}>
                        <div className={styles.phoneOpt}>
                            <input
                                type="text"
                                className={styles.inp}
                                required={true}
                            />
                            <label className={styles.phoneL}>Commission</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StoreEdit
