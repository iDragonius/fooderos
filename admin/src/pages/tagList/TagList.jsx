import styles from './TagList.module.scss'

import { Outlet } from 'react-router-dom'
const TagList = () => {
    return (
        <div className={styles.wrapper}>
            <Outlet />
        </div>
    )
}

export default TagList
