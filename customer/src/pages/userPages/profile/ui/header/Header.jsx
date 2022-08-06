import React, { useRef } from 'react'
import styles from './Header.module.scss'
import { useSelector } from 'react-redux'
import {
    avatar,
    currCreatedAt,
    currName,
} from '../../../../../store/slices/userInfoSlice'
import { STORAGE } from '../../../../../constants'
const Header = () => {
    const user = useSelector(currName)
    const created = useSelector(currCreatedAt)
    const avatarPath = useSelector(avatar)
    return (
        <div className={styles.main}>
            <div>
                <div className={styles.img}>
                    {avatarPath ? (
                        <img
                            src={`${STORAGE}${avatarPath}`}
                            alt=""
                            className={styles.imgCont}
                        />
                    ) : (
                        <div />
                    )}
                </div>
            </div>

            <div>
                <h1 className={styles.name}>{user}</h1>
                <p className={styles.date}>
                    User since: {created ? created.substr(0, 10) : ''}
                </p>
            </div>
        </div>
    )
}

export default Header
