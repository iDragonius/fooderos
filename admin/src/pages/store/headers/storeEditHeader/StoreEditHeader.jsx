import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
    useCreateStoreMutation,
    useEditStoreMutation,
} from '../../../../store/slices/api/storeApiSlice'
import { toast } from 'react-toastify'
import styles from '../../../tagList/headers/Header.module.scss'
import arrow from '../../../../assets/img/pages/arrow.png'
import {
    allLangs,
    checkStoreData,
    currLang,
    currSeleetedTags,
    currStoreNames,
    currStoreStatus,
    deleteData,
    destroyStatus,
    setLastLanguage,
    setNames,
    setSelectedTag,
} from '../../../../store/slices/storeSlice'

const StoreEditHeader = ({ name, file, tags, manager, price, commission }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const currentLang = useSelector(currLang)
    const status = useSelector(currStoreStatus)
    const langs = useSelector(allLangs)
    const currentStoreNames = useSelector(currStoreNames)
    const selectedTags = useSelector(currSeleetedTags)
    const [edit] = useEditStoreMutation()
    const back = () => {
        navigate(`/store/${location.pathname.split('/')[2]}/list`)
    }
    useEffect(() => {
        if (status) {
            editStore()
        }
        return destroy()
    }, [status])
    const destroy = () => {
        dispatch(destroyStatus())
    }
    const editStore = async () => {
        await edit({
            name: currentStoreNames['Az_name'],
            langs,
            tags: selectedTags,
            manager: manager.label,
            image: file[0],
            price,
            commission,
            id: location.pathname.split('/')[4],
            type:
                location.pathname.split('/')[2][0].toUpperCase() +
                location.pathname.split('/')[2].slice(1),
            ...currentStoreNames,
        })
            .unwrap()
            .then(() => {
                dispatch(deleteData())

                navigate(`/store/${location.pathname.split('/')[2]}/list`)
                toast.success(' Store Edited !')
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
                        <h1 className={styles.section}> Edit Store</h1>
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

export default StoreEditHeader
