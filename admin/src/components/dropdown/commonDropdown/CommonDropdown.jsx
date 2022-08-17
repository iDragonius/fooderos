import React from 'react'
import styles from './CommonDropdown.module.scss'
const CommonDropdown = ({ children, width, view, margintop, r }) => {
    return (
        <div
            className={view ? styles.main : 'hidden'}
            style={{
                width: `${width}px`,
                marginTop: `${margintop}px`,
                right: `${r}px`,
            }}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    )
}

export default CommonDropdown
