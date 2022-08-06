import React, { useEffect } from 'react'
import styles from '../../Navbar.module.scss'
import UserNavigation from '../../../navigation/userNavigation/UserNavigation'
import { useSelector } from 'react-redux'
import { selectCurrentName } from '../../../../../store/slices/authSlice'
import { STORAGE } from '../../../../../constants'
import { avatar } from '../../../../../store/slices/userInfoSlice'

const User = ({ view, setView }) => {
    const name = useSelector(selectCurrentName)
    const avatarPath = useSelector(avatar)
    useEffect(() => {
        document.addEventListener('click', () => {
            setView(false)
        })
        return document.removeEventListener('click', () => {
            setView(false)
        })
    })
    const actions = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setView(true)
    }

    return (
        <div className={styles.btnSection}>
            <button className={styles.userImg} onClick={actions}>
                {avatarPath ? (
                    <img
                        src={`${STORAGE}${avatarPath}`}
                        alt=""
                        className={styles.imgCont}
                    />
                ) : (
                    <div />
                )}
            </button>
            <UserNavigation view={view} setView={setView} />
        </div>
    )
}

export default User
