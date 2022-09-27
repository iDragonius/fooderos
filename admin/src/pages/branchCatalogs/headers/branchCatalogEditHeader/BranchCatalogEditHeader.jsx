import React from 'react'
import styles from '../../../tagList/headers/Header.module.scss'
import arrow from '../../../../assets/img/pages/arrow.png'
import { useLocation, useNavigate } from 'react-router-dom'

const BranchCatalogEditHeader = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const back = () => {
        navigate(`/branch-catalogs/list`)
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <div className={styles.name + ' py-[6px]'} onClick={back}>
                        <h1 className={styles.section}>
                            <img src={arrow} alt="arrow" />
                        </h1>
                        <h1 className={styles.section}> Edit Branch Catalog</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BranchCatalogEditHeader
