import React from 'react'
import styles from './DropdownMenu.module.scss'
const DropdownMenu = ({ width, children, view, setView }) => {
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

export default DropdownMenu
