import React, { useState } from 'react'
import styles from '../../../store/languages/Languages.module.scss'
import { useLanguagesQuery } from '../../../../store/slices/api/langApiSlice'

const NewBranchLanguages = () => {
    const { data, isLoading, isSuccess } = useLanguagesQuery()
    const [active, setActive] = useState('Az')

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

export default NewBranchLanguages
