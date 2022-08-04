import styles from '../UserNavigation.module.scss'
import { Link } from 'react-router-dom'
const NavigationElement = ({ path, name }) => {
    return (
        <Link to={`/${path}`} className={styles.navElement}>
            {name}
        </Link>
    )
}

export default NavigationElement
