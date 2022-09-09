import React, { useState } from 'react'
import styles from '../../../store/languages/Languages.module.scss'
import { useLanguagesQuery } from '../../../../store/slices/api/langApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    currLang,
    localDescription,
    localNames,
    namesTemp,
    setProductLocales,
    setTemp,
    changeLanguage,
} from '../../../../store/slices/productSlice'

const NewProductLanguages = () => {
    const { data, isLoading, isSuccess } = useLanguagesQuery()
    const [active, setActive] = useState('Az')
    const dispatch = useDispatch()
    const temp = useSelector(namesTemp)
    const currentLang = useSelector(currLang)
    const currentNames = useSelector(localNames)
    const currentDescriptions = useSelector(localDescription)
    const activeLang = (lang) => {
        if (lang === currentLang) {
            return
        }
        dispatch(setProductLocales({ ...temp }))
        if (currentNames[`${lang}_name`]) {
            setActive(lang)
            dispatch(changeLanguage(lang))
            dispatch(
                setTemp({
                    name: currentNames[`${lang}_name`],
                    description: currentDescriptions[`${lang}_description`],
                })
            )
            return
        }
        dispatch(setTemp({ name: '', description: '' }))
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

export default NewProductLanguages
