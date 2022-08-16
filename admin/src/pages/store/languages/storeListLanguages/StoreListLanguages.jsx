import React, { useState } from 'react'
import styles from '../Languages.module.scss'
import { useLanguagesQuery } from '../../../../store/slices/api/langApiSlice'
import Loader from '../../../../components/loader/Loader'

const StoreListLanguages = () => {
    const { data, isLoading, isSuccess } = useLanguagesQuery()
    const [active, setActive] = useState('Az')
    if (isLoading) {
        return <Loader />
    }
    const activeLang = (lang) => {
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

export default StoreListLanguages
