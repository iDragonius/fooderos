import React from 'react'
import Header from './layoutElements/header/Header'
import Sidebar from './layoutElements/sidebar/Sidebar'
import styles from './MainLayout.module.scss'
import { Outlet } from 'react-router-dom'
const MainLayout = () => {
    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout
