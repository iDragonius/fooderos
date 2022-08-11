import styles from './Header.module.scss'
import arrow from '../../../assets/img/pages/arrow.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    allLangs,
    checkData,
    checkStatus,
    deleteData,
    descs,
    destroyStatus,
    setData,
    tags,
    tagType,
} from '../../../store/slices/languageSlice'
import { useCreateTagMutation } from '../../../store/slices/api/tagApiSlice'
import { useEffect, useState } from 'react'
const NewTagHeader = ({ desc, tag, type, file }) => {
    const navigate = useNavigate()

    const back = (e) => {
        e.preventDefault()
        navigate('/tags/list')
    }
    const [clicker, setClikcer] = useState(0)
    const currDescs = useSelector(descs)
    const currTags = useSelector(tags)
    const langs = useSelector(allLangs)
    const tagName = useSelector(tagType)
    const [create] = useCreateTagMutation()
    const dispatch = useDispatch()
    const status = useSelector(checkStatus)
    useEffect(() => {
        if (status) {
            createTag()
        }
        console.log(1)
        return destroy()
    }, [status])
    const destroy = () => {
        dispatch(destroyStatus())
    }
    const createTag = async () => {
        await create({
            name: currTags['Az_name'],
            langs,
            tagName,
            image: file[0],
            ...currDescs,
            ...currTags,
        })
            .unwrap()
            .then(() => {
                dispatch(deleteData())
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const handleData = async (e) => {
        e.preventDefault()
        setClikcer(clicker + 1)
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
                    <h1 className={styles.section}> New Tag</h1>
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

export default NewTagHeader