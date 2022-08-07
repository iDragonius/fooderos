import React from 'react'
import styles from '../Header.module.scss'
import down from '../../../../../assets/img/down.png'
import { useSelector } from 'react-redux'
import { currName } from '../../../../../store/slices/userInfoSlice'

const User = () => {
    const user = useSelector(currName)
    return (
        <div className={styles.profile}>
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
    )
}

export default User
