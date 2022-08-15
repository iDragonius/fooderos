import styles from './Langugages.module.scss'
import { useLanguagesQuery } from '../../../store/slices/api/langApiSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    changeLanguage,
    currLanguage,
    deleteData,
    descs,
    setData,
    tags,
} from '../../../store/slices/languageSlice'
import Loader from '../../../components/loader/Loader'

const EditLanguages = ({ setDesc, setTag, type, tag, desc }) => {
    const { data, isLoading, isSuccess } = useLanguagesQuery()
    const dispatch = useDispatch()
    const currTags = useSelector(tags)
    const currDescs = useSelector(descs)
    const currLang = useSelector(currLanguage)
    const [active, setActive] = useState('Az')

    if (isLoading) {
        return <Loader />
    }

    const activeLang = (lang) => {
        if (lang === currLang) {
            return
        }
        console.log(tag, desc)
        dispatch(setData({ tag, type, desc }))
        if (currTags[`${lang}_name`]) {
            setActive(lang)
            dispatch(changeLanguage(lang))
            setTag(currTags[`${lang}_name`])
            setDesc(currDescs[`${lang}_desc`])
            return
        }
        setDesc('')
        setTag('')
        dispatch(changeLanguage(lang))
        setActive(lang)
    }
    return (
        <div className={styles.cont}>
            <>
                {isSuccess &&
                    data.map((lang) => (
                        <div
                            key={lang.lang}
                            className={
                                active === lang.lang
                                    ? styles.language + ' ' + styles.active
                                    : styles.language
                            }
                            onClick={() => activeLang(lang.lang)}
                        >
                            {lang.lang}
                        </div>
                    ))}
            </>
        </div>
    )
}

export default EditLanguages
