import React from 'react'
import styles from '../../../../../../store/sections/list/status/Status.module.scss'

const AddonStatus = ({ checked }) => {
    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                defaultChecked={checked}
                // onChange={handleStatus}
            />
            <span className={styles.slider + ' ' + styles.round}></span>
        </label>
    )
}

export default AddonStatus
