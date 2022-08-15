import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import arrow from '../../../assets/img/pages/arrow.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUpdateTagMutation } from '../../../store/slices/api/tagApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    allLangs,
    checkData,
    checkStatus,
    currentId,
    deleteData,
    descs,
    destroyStatus,
    setData,
    tags,
    tagType,
} from '../../../store/slices/languageSlice'
import { toast } from 'react-toastify'

const TagEditHeader = ({ type, tag, desc, file }) => {
    const navigate = useNavigate()
    const back = (e) => {
        e.preventDefault()
        navigate('/tags/list')
    }
    const locale = useLocation()
    const [updateTag] = useUpdateTagMutation()
    const currDescs = useSelector(descs)
    const currTags = useSelector(tags)
    const langs = useSelector(allLangs)
    const tagName = useSelector(tagType)
    const dispatch = useDispatch()
    const currId = useSelector(currentId)
    const status = useSelector(checkStatus)
    useEffect(() => {
        if (status) {
            save()
        }
        return destroy()
    }, [status])
    const destroy = () => {
        dispatch(destroyStatus())
    }

    const save = async () => {
        await updateTag({
            name: currTags['Az_name'],
            id: locale.pathname.split('/')[3],
            langs,
            image: file[0],
            tagName,
            ...currDescs,
            ...currTags,
        })
            .unwrap()
            .then(() => {
                dispatch(deleteData())
                navigate('/tags/list')
                toast.success('New Tag created !')
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const handleData = async (e) => {
        e.preventDefault()
        dispatch(setData({ desc, tag, type }))
        dispatch(checkData())
    }
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <div className={styles.name} onClick={back}>
                    <h1 className={styles.section}>
                        <img src={arrow} alt="" />
                    </h1>
                    <h1 className={styles.section}> Edit Tag</h1>
                </div>

                <div className={styles.btns}>
                    <button
                        className={styles.tagType + ' ' + styles.btn}
                        onClick={handleData}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TagEditHeader
