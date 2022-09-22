import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../../../tagList/headers/Header.module.scss'

const BranchCatalogListHeader = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const changePage = (e) => {
        e.preventDefault()
        navigate(`/branch-catalogs/${location.pathname.split('/')[2]}/new`)
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <div className={styles.name}>
                        <svg
                            fill={'#fff'}
                            height={24}
                            width={24}
                            version="1.1"
                            viewBox="0 0 700 700"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g>
                                <path d="m275.33 522.67c0 20.535-16.801 37.332-37.332 37.332h-130.67c-20.535 0-37.332-16.801-37.332-37.332v-130.67c0-20.535 16.801-37.332 37.332-37.332h130.67c20.535 0 37.332 16.801 37.332 37.332z" />
                                <path d="m630 429.33h-298.67c-11.199 0-18.668-7.4648-18.668-18.668v-18.668c0-11.199 7.4648-18.668 18.668-18.668h298.67z" />
                                <path d="m555.33 522.67h-224c-11.199 0-18.668-7.4648-18.668-18.668v-18.668c0-11.199 7.4648-18.668 18.668-18.668h224z" />
                                <path d="m275.33 242.67c0 20.535-16.801 37.332-37.332 37.332h-130.67c-20.535 0-37.332-16.801-37.332-37.332v-130.67c0-20.535 16.801-37.332 37.332-37.332h130.67c20.535 0 37.332 16.801 37.332 37.332z" />
                                <path d="m630 149.33h-298.67c-11.199 0-18.668-7.4648-18.668-18.668l0.003907-18.664c0-11.199 7.4648-18.668 18.668-18.668h298.67z" />
                                <path d="m555.33 242.67h-224c-11.199 0-18.668-7.4648-18.668-18.668v-18.668c0-11.199 7.4648-18.668 18.668-18.668h224z" />
                            </g>
                        </svg>
                        <h1 className={styles.section}>Branch Catalog List</h1>
                    </div>

                    <div className={styles.btns}>
                        <button
                            className={styles.tag + ' ' + styles.btn}
                            onClick={changePage}
                        >
                            <span>+</span>
                            New Catalog
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BranchCatalogListHeader
