import Header from './header/Header'
import styles from './TagList.module.scss'
import Languages from './languages/Languages'
import Loader from '../../components/loader/Loader'
import List from './list/List'
const TagList = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <Languages />
            <div className={styles.cont}>
                <List />
            </div>
        </div>
    )
}

export default TagList
