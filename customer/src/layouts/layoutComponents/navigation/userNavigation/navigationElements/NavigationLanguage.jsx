import React, { Children } from 'react'
import styles from '../UserNavigation.module.scss'
const NavigationLanguage = ({ children }) => {
    return (
        <>
            <div className={styles.navElement}>
                {localStorage.getItem('lang')}
            </div>
            {children}
        </>
    )
}

export default NavigationLanguage
