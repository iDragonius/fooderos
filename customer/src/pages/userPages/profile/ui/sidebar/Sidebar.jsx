import styles from './Sidebar.module.scss'
import SidebarLogout from './sidebarElements/SidebarLogout'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
    return (
        <div className={styles.main}>
            <div className={styles.cont}>
                <NavLink
                    to={`/profile/main-info`}
                    className={({ isActive }) =>
                        isActive ? styles.nav + ' ' + styles.active : styles.nav
                    }
                >
                    Profile
                </NavLink>
                <NavLink
                    to={`/profile/free-orders`}
                    className={({ isActive }) =>
                        isActive ? styles.nav + ' ' + styles.active : styles.nav
                    }
                >
                    Free orders
                </NavLink>
                <NavLink
                    to={`/profile/payment-methods`}
                    className={({ isActive }) =>
                        isActive ? styles.nav + ' ' + styles.active : styles.nav
                    }
                >
                    Payment methods
                </NavLink>
                <NavLink
                    to={`/profile/settings`}
                    className={({ isActive }) =>
                        isActive ? styles.nav + ' ' + styles.active : styles.nav
                    }
                >
                    Settings
                </NavLink>
                <NavLink
                    to={`/profile/support`}
                    className={({ isActive }) =>
                        isActive ? styles.nav + ' ' + styles.active : styles.nav
                    }
                >
                    Support
                </NavLink>
                <SidebarLogout />
            </div>
        </div>
    )
}

export default Sidebar
