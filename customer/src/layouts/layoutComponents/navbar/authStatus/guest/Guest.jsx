import React from 'react'
import styles from '../../Navbar.module.scss'

const Guest = ({ setOpen }) => {
    const openModal = (e) => {
        e.preventDefault()
        setOpen(true)
    }
    return (
        <div className={styles.btnSection}>
            <button className={styles.loginBtn} onClick={openModal}>
                <i>
                    <svg
                        viewBox="0 0 20 20"
                        width={16}
                        height={16}
                        className={styles.login}
                    >
                        <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"></path>
                    </svg>
                </i>
                <span className={styles.log}>Login</span>
            </button>
        </div>
    )
}

export default Guest
