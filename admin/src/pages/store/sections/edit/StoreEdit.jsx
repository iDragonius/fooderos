import React, { useEffect, useState } from 'react'
import {
    useAllTagsQuery,
    useManagersQuery,
    useShowStoreQuery,
} from '../../../../store/slices/api/storeApiSlice'
import { useLocation } from 'react-router-dom'
import StoreEditHeader from '../../headers/storeEditHeader/StoreEditHeader'
import StoreEditLanguages from '../../languages/storeEditLanguages/StoreEditLanguages'
import ImgUpload from '../new/imgUpload/ImgUpload'
import { useDispatch, useSelector } from 'react-redux'
import {
    allTags,
    currLang,
    currManagers,
    currStore,
    currStoreNames,
    currTags,
    setSelectedTag,
} from '../../../../store/slices/storeSlice'
import styles from '../new/NewStore.module.scss'
import Select from 'react-select'

const StoreEdit = () => {
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
    const [manager, setManager] = useState('')
    const [price, setPrice] = useState('')
    const [commission, setCommission] = useState('')
    const [allManagers, setAllManagers] = useState([])
    const [name, setName] = useState('')
    const { data: managers, isSuccess: success } = useManagersQuery()
    const currentStore = useSelector(currStore)
    const currentManagers = useSelector(currManagers)
    const location = useLocation()
    const [allTag, setAllTag] = useState([])
    const alllTags = useSelector(allTags)
    const currentTags = useSelector(currTags)
    const [selectedTags, setSelectedTags] = useState([])
    const activeLanguage = useSelector(currLang)
    const currentStoreName = useSelector(currStoreNames)
    const dispatch = useDispatch()
    const {
        data: tags,
        isSuccess,
        refetch,
    } = useAllTagsQuery(location.pathname.split('/')[2])
    useEffect(() => {
        refetch()
    }, [location])
    useEffect(() => {
        setManager({ label: currentStore.manager, value: currentStore.manager })
        setCommission(currentStore.commission)
        setPrice(currentStore.price)
        setName(currentStoreName['Az_name'])
    }, [currentStore])
    useEffect(() => {
        setAllManagers([])
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
        dispatch(setSelectedTag(selectedTags))
    }, [activeLanguage])
    useEffect(() => {
        setSelectedTags(currentTags)
    }, [currentTags])
    const [file, setFile] = useState([])

    const { data, isSuccess: succ } = useShowStoreQuery(
        location.pathname.split('/')[4]
    )

    return (
        <>
            <StoreEditHeader
                name={name}
                tags={selectedTags}
                commission={commission}
                manager={manager}
                file={file}
                price={price}
            />
            <StoreEditLanguages setName={setName} name={name} />
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
                        styles={customStyles}
                        placeholder={'Choose tags'}
                        className={styles.selectBtn}
                        value={selectedTags}
                        onChange={(data) => setSelectedTags(data)}
                        options={allTag}
                    />
                    <Select
                        options={allManagers}
                        styles={customStyles}
                        placeholder={'Account Manager'}
                        className={styles.selectBtn}
                        value={manager}
                        onChange={(data) => setManager(data)}
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

export default StoreEdit
