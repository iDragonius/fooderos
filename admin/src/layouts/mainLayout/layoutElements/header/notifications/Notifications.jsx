import styles from '../Header.module.scss'
import notification from '../../../../../assets/img/notification.svg'
const Notifications = () => {
    return (
        <div className={styles.notification}>
            <img src={notification} alt="notification" />
            <span className={styles.notificationNum}>1</span>
        </div>
    )
}

export default Notifications
