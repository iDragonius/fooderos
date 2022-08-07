import styles from './Langugages.module.scss'
import { useLanguagesQuery } from '../../../store/slices/api/langApiSlice'
import { useState } from 'react'
import Loader from '../../../components/loader/Loader'
const Languages = () => {
    const { data, isLoading, isSuccess } = useLanguagesQuery()

    const [active, setActive] = useState('Az')
    if (isLoading) {
        return <Loader />
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
                            onClick={() => setActive(lang.lang)}
                        >
                            {lang.lang}
                        </div>
                    ))}
            </>
        </div>
    )
}

export default Languages
