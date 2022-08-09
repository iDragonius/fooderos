import styles from './Langugages.module.scss'
import { useLanguagesQuery } from '../../../store/slices/api/langApiSlice'
import { useEffect, useState } from 'react'
import Loader from '../../../components/loader/Loader'
import {
    changeLanguage,
    currLanguage,
    deleteData,
    setData,
    tags,
} from '../../../store/slices/languageSlice'
import { useDispatch, useSelector } from 'react-redux'
const Languages = ({ setTag, setDesc, tag, type, desc }) => {
    const { data, isLoading, isSuccess } = useLanguagesQuery()
    const [langs, setLangs] = useState([])
    const dispatch = useDispatch()
    const currTags = useSelector(tags)
    const currLang = useSelector(currLanguage)
    const [active, setActive] = useState('Az')
    useEffect(() => {
        dispatch(deleteData())
    }, [])
    useEffect(() => {
        setLangs(isSuccess ? data : [])
        console.log(langs)
    }, [isSuccess])
    if (isLoading) {
        return <Loader />
    }

    const activeLang = (lang) => {
        if (lang === currLang) {
            return
        }
        dispatch(setData({ tag, type, desc }))
        if (currTags[lang]) {
            setActive(lang)
            dispatch(changeLanguage(lang))
            setTag(currTags[lang])
            console.log(1)
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

export default Languages
