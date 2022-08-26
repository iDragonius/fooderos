import styles from './Header.module.scss'
import arrow from '../../../assets/img/pages/arrow.png'
import { useLocation, useNavigate } from 'react-router-dom'
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
import { toast } from 'react-toastify'
const NewTagHeader = ({ desc, tag, type, file }) => {
    const navigate = useNavigate()

    const back = (e) => {
        e.preventDefault()
        navigate(`/tags/${location.pathname.split('/')[2]}/list`)
    }
    const [clicker, setClikcer] = useState(0)
    const currDescs = useSelector(descs)
    const currTags = useSelector(tags)
    const langs = useSelector(allLangs)
    const tagName = useSelector(tagType)
    const [create] = useCreateTagMutation()
    const dispatch = useDispatch()
    const location = useLocation()
    const status = useSelector(checkStatus)
    useEffect(() => {
        if (status) {
            createTag()
        }
        return destroy()
    }, [status])
    const destroy = () => {
        dispatch(destroyStatus())
    }
    const createTag = async () => {
        if (!currTags['Az_name']) {
            return toast.warn('Fill the <Az> tag name')
        }
        await create({
            name: currTags['Az_name'],
            langs,
            tagName,
            image: file[0],
            rest:
                location.pathname.split('/')[2][0].toUpperCase() +
                location.pathname.split('/')[2].slice(1),
            ...currDescs,
            ...currTags,
        })
            .unwrap()
            .then(() => {
                dispatch(deleteData())

                navigate(`/tags/${location.pathname.split('/')[2]}/list`)
                toast.success('New Tag created !')
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const handleData = async (e) => {
        e.preventDefault()
        setClikcer(clicker + 1)
        console.log(type)
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
