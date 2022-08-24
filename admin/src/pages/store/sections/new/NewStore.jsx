import React, { useEffect, useState } from 'react'
import NewStoreHeader from '../../headers/newStoreHeader/NewStoreHeader'
import NewStoreLanguages from '../../languages/newStoreLanguages/NewStoreLanguages'
import ImgUpload from './imgUpload/ImgUpload'
import Select from 'react-select'
import styles from './NewStore.module.scss'

import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    useAllTagsQuery,
    useManagersQuery,
} from '../../../../store/slices/api/storeApiSlice'
import {
    currManagers,
    allTags,
    currLang,
    setSelectedTag,
    currTags,
} from '../../../../store/slices/storeSlice'

const NewStore = () => {
    const [file, setFile] = useState([])
    const [multiSelectData, setMultiSelectData] = useState([])
    const [selectData, setSelectData] = useState([])
    const [price, setPrice] = useState()
    const [commission, setCommission] = useState()
    const [name, setName] = useState('')
    const location = useLocation()
    const { data: tags, isSuccess } = useAllTagsQuery(
        location.pathname.split('/')[2]
    )
    const { data: managers, isSuccess: success } = useManagersQuery()
    const [allTag, setAllTag] = useState([])
    const [allManagers, setAllManagers] = useState([])
    const alllTags = useSelector(allTags)
    const currentTags = useSelector(currTags)
    const currentManagers = useSelector(currManagers)
    const dispatch = useDispatch()
    const activeLanguage = useSelector(currLang)

    useEffect(() => {
        setAllTag([])
        for (let i = 0; i < alllTags.length; i++) {
            setAllTag((old) => [
                ...old,
                {
                    value: alllTags[i][activeLanguage],
                    label: alllTags[i][activeLanguage],
                },
            ])
        }
    }, [alllTags, activeLanguage])
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
    useEffect(() => {
        dispatch(setSelectedTag(multiSelectData))
    }, [activeLanguage])
    useEffect(() => {
        setMultiSelectData(currentTags)
    }, [currentTags])

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
                        options={allTag}
                        styles={customStyles}
                        value={multiSelectData}
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
