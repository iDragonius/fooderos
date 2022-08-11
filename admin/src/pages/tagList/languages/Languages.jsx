import styles from './Langugages.module.scss'
import { useLanguagesQuery } from '../../../store/slices/api/langApiSlice'
import { useEffect, useState } from 'react'
import Loader from '../../../components/loader/Loader'
import {
    changeLanguage,
    currLanguage,
    deleteData,
    descs,
    setData,
    tags,
} from '../../../store/slices/languageSlice'
import { useDispatch, useSelector } from 'react-redux'
const Languages = ({ setTag, setDesc, tag, type, desc }) => {
    const { data, isLoading, isSuccess } = useLanguagesQuery()
    const [langs, setLangs] = useState([])
    const dispatch = useDispatch()
    const currTags = useSelector(tags)
    const currDescs = useSelector(descs)
    const currLang = useSelector(currLanguage)
    const [active, setActive] = useState('Az')
    useEffect(() => {
        dispatch(deleteData())
    }, [])

    if (isLoading) {
        return <Loader />
    }

    const activeLang = (lang) => {
        if (lang === currLang) {
            return
        }
        dispatch(setData({ tag, type: 'Market', desc }))
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

export default Languages
