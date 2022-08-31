import React, { useState } from 'react'
import styles from '../../../store/languages/Languages.module.scss'
import { useLanguagesQuery } from '../../../../store/slices/api/langApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    changeLanguage,
    currAddresses,
    currLanguage,
    currNames,
    setBranchData,
} from '../../../../store/slices/branchListSlice'

const BranchEditLanguages = ({ setName, setAddress, name, address }) => {
    const { data, isSuccess } = useLanguagesQuery()
    const [active, setActive] = useState('Az')
    const dispatch = useDispatch()
    const currentBranchNames = useSelector(currNames)
    const currentAddresses = useSelector(currAddresses)
    const currentLanguage = useSelector(currLanguage)
    const activeLang = (lang) => {
        if (lang === currentLanguage) {
            return
        }

        dispatch(setBranchData({ name, address }))

        if (currentBranchNames[`${lang}_name`]) {
            setActive(lang)
            dispatch(changeLanguage(lang))
            setName(currentBranchNames[`${lang}_name`])
            setAddress(currentAddresses[`${lang}_address`])
            return
        }
        setName('')
        setAddress('')
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

export default BranchEditLanguages
