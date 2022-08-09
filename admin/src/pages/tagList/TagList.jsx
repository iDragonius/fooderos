import styles from './TagList.module.scss'

import { Outlet } from 'react-router-dom'
const TagList = () => {
    return (
        <div className={styles.wrapper}>
            <Outlet />

            {/*<div className={styles.cont}>*/}
            {/*    /!*{section === 'List' && <List />}*!/*/}
            {/*    /!*{section === 'NewTag' && <NewTag />}*!/*/}
            {/*</div>*/}
        </div>
    )
}

export default TagList
