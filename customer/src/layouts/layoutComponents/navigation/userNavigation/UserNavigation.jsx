import React, { useState } from 'react'
import DropdownMenu from '../../../../components/ui/dropdown/dropdownMenu/DropdownMenu'
import styles from './UserNavigation.module.scss'
import NavigationElement from './navigationElements/NavigationElement'
import NavigationLanguage from './navigationElements/NavigationLanguage'
import NavigationLogout from './navigationElements/NavigationLogout'
const UserNavigation = ({ view, setView }) => {
    return (
        <DropdownMenu width={150} view={view} setView={setView}>
            <ul className={styles.navs}>
                <NavigationElement
                    path={'profile/main-info'}
                    name={'Profile'}
                />
                <NavigationElement
                    path={'my-addresses'}
                    name={'My Addresses'}
                />
                <NavigationElement path={'my-orders'} name={'My Orders'} />
                <NavigationLanguage />
                <NavigationLogout />
            </ul>
        </DropdownMenu>
    )
}

export default UserNavigation
