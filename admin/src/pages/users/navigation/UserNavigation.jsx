import React, { useState } from 'react'

import styles from '../../store/languages/Languages.module.scss'
import { NavLink } from 'react-router-dom'

const UserNavigation = () => {
    return (
        <div className={styles.cont}>
            <NavLink to={'/users/roles'}>
                <div
                    // className={
                    //     active === lang.lang
                    //         ? styles.language + ' ' + styles.active
                    //         : styles.language
                    // }
                    className={({ isActive }) =>
                        isActive
                            ? styles.active + ' ' + styles.language
                            : styles.language
                    }
                >
                    Roles
                </div>
            </NavLink>
            <NavLink to={'/users/list'}>
                <div
                    className={
                        active === lang.lang
                            ? styles.language + ' ' + styles.active
                            : styles.language
                    }
                >
                    All users
                </div>
            </NavLink>
        </div>
    )
}

export default UserNavigation
