import styles from './Header.module.scss'
import Status from './status/Status'
import Notifications from './notifications/Notifications'
import User from './user/User'
const Header = () => {
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <div className={styles.block}></div>
                <h1 className={styles.logo}>Super Admin</h1>
            </div>
            <div className={styles.wrapper}>
                <Status />
                <Notifications />
                <User />
            </div>
        </div>
    )
}

export default Header
