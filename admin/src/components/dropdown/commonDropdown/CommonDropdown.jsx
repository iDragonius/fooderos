import React from 'react'
import styles from './CommonDropdown.module.scss'
const CommonDropdown = ({ children, width, view }) => {
    return (
        <div
            className={view ? styles.main : 'hidden'}
            style={{ width: `${width}px` }}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    )
}

export default CommonDropdown
