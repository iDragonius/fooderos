import React, { useEffect, useState } from 'react'
import styles from '../../../tagList/headers/Header.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import arrow from '../../../../assets/img/pages/arrow.png'

import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
    allLangs,
    checkStoreData,
    currLang,
    currSeleetedTags,
    currStoreNames,
    currStoreStatus,
    deleteData,
    destroyStatus,
    setData,
    setLastLanguage,
    setNames,
    setSelectedTag,
} from '../../../../store/slices/storeSlice'
import { useCreateStoreMutation } from '../../../../store/slices/api/storeApiSlice'

const NewStoreHeader = ({ name, file, tags, manager, price, commission }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const back = () => {
        navigate(`/store/${location.pathname.split('/')[2]}/list`)
    }
    const dispatch = useDispatch()
    const currentLang = useSelector(currLang)
    const status = useSelector(currStoreStatus)
    const langs = useSelector(allLangs)
    const currentStoreNames = useSelector(currStoreNames)
    const selectedTags = useSelector(currSeleetedTags)
    const [create] = useCreateStoreMutation()
    useEffect(() => {
        if (status) {
            createStore()
        }
        return destroy()
    }, [status])
    const destroy = () => {
        dispatch(destroyStatus())
    }
    const createStore = async () => {
        if (!currentStoreNames['Az_name']) {
            return toast.warn('Fill the <Az> store name')
        }
        await create({
            name: currentStoreNames['Az_name'],
            langs,
            tags: selectedTags,
            manager: manager.label,
            image: file[0],
            price,
            commission,
            type:
                location.pathname.split('/')[2][0].toUpperCase() +
                location.pathname.split('/')[2].slice(1),
            ...currentStoreNames,
        })
            .unwrap()
            .then(() => {
                dispatch(deleteData())

                navigate(`/store/${location.pathname.split('/')[2]}/list`)
                toast.success('New Store created !')
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const handleData = async (e) => {
        e.preventDefault()
        dispatch(setNames({ name }))
        dispatch(checkStoreData())
        dispatch(setLastLanguage(currentLang))
        dispatch(setSelectedTag(tags))
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <div className={styles.name} onClick={back}>
                        <h1 className={styles.section}>
                            <img src={arrow} alt="" />
                        </h1>
                        <h1 className={styles.section}> New Store</h1>
                    </div>

                    <div className={styles.btns}>
                        <button
                            className={styles.tag + ' ' + styles.btn}
                            onClick={handleData}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewStoreHeader
