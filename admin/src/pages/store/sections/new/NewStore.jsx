import React, { useEffect, useState } from 'react'
import NewStoreHeader from '../../headers/newStoreHeader/NewStoreHeader'
import NewStoreLanguages from '../../languages/newStoreLanguages/NewStoreLanguages'
import ImgUpload from './imgUpload/ImgUpload'
import Select from 'react-select'
import styles from './NewStore.module.scss'

import axios from 'axios'
import { useTagsQuery } from '../../../../store/slices/api/tagApiSlice'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { currData } from '../../../../store/slices/tagSlice'
import { useManagersQuery } from '../../../../store/slices/api/storeApiSlice'
import { currManagers } from '../../../../store/slices/storeSlice'

const NewStore = () => {
    const [file, setFile] = useState([])
    const [multiSelectData, setMultiSelectData] = useState([])
    const [selectData, setSelectData] = useState([])
    const [price, setPrice] = useState()
    const [commission, setCommission] = useState()
    const [name, setName] = useState('')
    const location = useLocation()

    const { data: tags, isSuccess } = useTagsQuery({
        lang: localStorage.getItem('lang'),
        rest: location.pathname.split('/')[2],
    })
    const { data: managers, isSuccess: success } = useManagersQuery()
    const [allTags, setAllTags] = useState([])
    const [allManagers, setAllManagers] = useState([])
    const currentTags = useSelector(currData)
    const currentManagers = useSelector(currManagers)
    useEffect(() => {
        for (let i = 0; i < currentTags.length; i++) {
            setAllTags((old) => [
                ...old,
                {
                    value: currentTags[i].name,
                    label: currentTags[i].name,
                },
            ])
        }
    }, [currentTags])
    useEffect(() => {
        for (let i = 0; i < currentManagers.length; i++) {
            setAllManagers((old) => [
                ...old,
                {
                    value: currentManagers[i].name,
                    label: currentManagers[i].name,
                },
            ])
        }
    }, [currentManagers])
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
    const save = async () => {
        await axios.post('http://192.168.202.52:81/api/kasha', {
            tags: multiSelectData,
        })
    }
    return (
        <>
            <NewStoreHeader
                file={file}
                tags={multiSelectData}
                name={name}
                manager={selectData}
                price={price}
                commission={commission}
            />
            <NewStoreLanguages name={name} setName={setName} />
            <div className={'ml-10 mt-8 flex '}>
                <ImgUpload file={file} setFile={setFile} />
                <div className={'ml-8'}>
                    <div>
                        <div className={styles.phoneOpt}>
                            <input
                                type="text"
                                className={styles.inp}
                                required={true}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className={styles.phoneL}>
                                Restaurant Name
                            </label>
                        </div>
                    </div>

                    <Select
                        isMulti={true}
                        options={allTags}
                        styles={customStyles}
                        placeholder={'Choose tags'}
                        className={styles.selectBtn}
                        onChange={(data) => setMultiSelectData(data)}
                    />

                    <Select
                        options={allManagers}
                        styles={customStyles}
                        placeholder={'Account Manager'}
                        className={styles.selectBtn}
                        onChange={(data) => setSelectData(data)}
                    />
                    <div className={styles.tagName}>
                        <div className={styles.phoneOpt}>
                            <input
                                type="text"
                                className={styles.inp}
                                required={true}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
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
                                value={commission}
                                onChange={(e) => setCommission(e.target.value)}
                            />
                            <label className={styles.phoneL}>Commission</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewStore
