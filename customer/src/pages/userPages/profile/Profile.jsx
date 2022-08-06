import Layout from '../../../layouts/layout/Layout'
import Sidebar from './ui/sidebar/Sidebar'
import Header from './ui/header/Header'
import styles from './Profile.module.scss'
import { Outlet } from 'react-router-dom'
const Profile = () => {
    return (
        <Layout>
            <div className={styles.wrapper}>
                <Sidebar />
                <div className={styles.main}>
                    <Header />
                    <Outlet />
                </div>
            </div>
        </Layout>
    )
}

export default Profile
