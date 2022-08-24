import React, { useState } from 'react'
import { useLanguagesQuery } from '../../../../store/slices/api/langApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    changeLanguage,
    currLang,
    currStoreNames,
    setLastLanguage,
    setNames,
} from '../../../../store/slices/storeSlice'
import styles from '../Languages.module.scss'

const StoreEditLanguages = ({ name, setName }) => {
    const { data, isLoading, isSuccess } = useLanguagesQuery()
    const [active, setActive] = useState('Az')
    const dispatch = useDispatch()
    const currentLang = useSelector(currLang)
    const currentStoreNames = useSelector(currStoreNames)

    const activeLang = (lang) => {
        if (lang === currentLang) {
            return
        }
        dispatch(setLastLanguage(currentLang))
        dispatch(setNames({ name }))
        if (currentStoreNames[`${lang}_name`]) {
            setActive(lang)
            dispatch(changeLanguage(lang))
            setName(currentStoreNames[`${lang}_name`])
            return
        }
        setName('')
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

export default StoreEditLanguages
