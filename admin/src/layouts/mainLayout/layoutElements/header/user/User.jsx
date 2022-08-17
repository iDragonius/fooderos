import React, { useEffect, useState } from 'react'
import styles from './User.module.scss'
import down from '../../../../../assets/img/down.png'
import { useSelector } from 'react-redux'
import { currName } from '../../../../../store/slices/userInfoSlice'
import UserDropdown from './userDropdown/UserDropdown'

const User = () => {
    const user = useSelector(currName)
    const [view, setView] = useState(false)
    const [currLang, setCurrLang] = useState(localStorage.getItem('lang'))
    useEffect(() => {
        document.addEventListener('click', () => {
            setView(false)
        })
        return document.removeEventListener('click', () => {
            setView(false)
        })
    })
    const actions = (e) => {
        e.preventDefault()
        e.stopPropagation()
        view ? setView(false) : setView(true)
    }
    return (
        <>
            <UserDropdown
                view={view}
                currLang={currLang}
                setCurrLang={setCurrLang}
            />
            <div className={styles.profile} onClick={actions}>
                <div className={styles.avatar}>
                    {user ? (
                        <>
                            {user.split(' ')[0][0]}
                            {user.split(' ')[1][0]}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <p className={styles.name}>{user}</p>
                <img src={down} alt="arrow down" />
            </div>
        </>
    )
}

export default User
