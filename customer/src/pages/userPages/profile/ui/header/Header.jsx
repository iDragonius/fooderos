import React from 'react'
import styles from './Header.module.scss'
import { useSelector } from 'react-redux'
import { selectCurrentName } from '../../../../../store/slices/authSlice'
const Header = () => {
    const user = useSelector(selectCurrentName)
    return (
        <div className={styles.main}>
            <div className={styles.img}> {user ? user[0] : ''}</div>
            <div>
                <h1 className={styles.name}>{user}</h1>
                <p className={styles.date}>User since: </p>
            </div>
        </div>
    )
}

export default Header
