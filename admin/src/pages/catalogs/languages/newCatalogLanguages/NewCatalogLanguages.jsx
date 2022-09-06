import React, { useState } from 'react'
import styles from '../../../store/languages/Languages.module.scss'
import { useLanguagesQuery } from '../../../../store/slices/api/langApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    currLang,
    currNames,
    setNames,
    changeLanguage,
} from '../../../../store/slices/catalogSlice'

const NewCatalogLanguages = ({ setName, name }) => {
    const { data, isLoading, isSuccess } = useLanguagesQuery()
    const [active, setActive] = useState('Az')
    const dispatch = useDispatch()
    const currentLang = useSelector(currLang)
    const currentStoreNames = useSelector(currNames)

    const activeLang = (lang) => {
        if (lang === currentLang) {
            return
        }
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

export default NewCatalogLanguages
