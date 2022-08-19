import React from 'react'
import styles from '../../../tagList/headers/Header.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'

const StoreListHeader = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const changePage = (e) => {
        e.preventDefault()
        navigate(`/store/${location.pathname.split('/')[2]}/new`)
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <div className={styles.name}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            width={24}
                            height={24}
                        >
                            <path
                                fill="#fff"
                                d="M32 20.1H7.162a1.5 1.5 0 0 1-1.3-2.245L11.833 7.4a1.5 1.5 0 0 1 1.3-.755H32a1.5 1.5 0 0 1 0 3H14.006L9.747 17.1H32a1.5 1.5 0 0 1 0 3Z"
                            />
                            <path
                                fill="#fff"
                                d="M56.838 20.1H32a1.5 1.5 0 0 1 0-3h22.253l-4.259-7.455H32a1.5 1.5 0 0 1 0-3h18.864a1.5 1.5 0 0 1 1.3.755l5.976 10.454a1.5 1.5 0 0 1-1.3 2.245zM13.372 31.267a7.719 7.719 0 0 1-7.71-7.71V18.6a1.5 1.5 0 0 1 3 0v4.958a4.71 4.71 0 1 0 9.419 0V18.6a1.5 1.5 0 0 1 3 0v4.958a7.718 7.718 0 0 1-7.709 7.709z"
                            />
                            <path
                                fill="#fff"
                                d="M25.791 31.267a7.719 7.719 0 0 1-7.71-7.71V18.6a1.5 1.5 0 0 1 3 0v4.958a4.71 4.71 0 1 0 9.419 0V18.6a1.5 1.5 0 0 1 3 0v4.958a7.718 7.718 0 0 1-7.709 7.709Z"
                            />
                            <path
                                fill="#fff"
                                d="M38.209 31.267a7.718 7.718 0 0 1-7.709-7.71V18.6a1.5 1.5 0 0 1 3 0v4.958a4.71 4.71 0 1 0 9.419 0V18.6a1.5 1.5 0 0 1 3 0v4.958a7.719 7.719 0 0 1-7.71 7.709Z"
                            />
                            <path
                                fill="#fff"
                                d="M50.628 31.267a7.718 7.718 0 0 1-7.709-7.71V18.6a1.5 1.5 0 0 1 3 0v4.958a4.71 4.71 0 1 0 9.419 0V18.6a1.5 1.5 0 1 1 3 0v4.958a7.719 7.719 0 0 1-7.71 7.709Z"
                            />
                            <path
                                fill="#fff"
                                d="M44.418 20.1a1.5 1.5 0 0 1-1.436-1.068L39.838 8.577a1.5 1.5 0 0 1 2.873-.865l3.144 10.455a1.5 1.5 0 0 1-1 1.868 1.475 1.475 0 0 1-.437.065zm-24.836 0a1.475 1.475 0 0 1-.433-.064 1.5 1.5 0 0 1-1-1.868l3.14-10.456a1.5 1.5 0 0 1 2.873.865l-3.144 10.454a1.5 1.5 0 0 1-1.436 1.069zM32 20.1a1.5 1.5 0 0 1-1.5-1.5V8.145a1.5 1.5 0 1 1 3 0V18.6a1.5 1.5 0 0 1-1.5 1.5zm0 37.255H9.684a1.5 1.5 0 0 1-1.5-1.5v-27.31a1.5 1.5 0 0 1 3 0v25.81H32a1.5 1.5 0 0 1 0 3z"
                            />
                            <path
                                fill="#fff"
                                d="M54.316 57.355H32a1.5 1.5 0 1 1 0-3h20.816v-25.81a1.5 1.5 0 0 1 3 0v27.31a1.5 1.5 0 0 1-1.5 1.5Z"
                            />
                            <path
                                fill="#fff"
                                d="M43.881 56.98a1.5 1.5 0 0 1-1.5-1.5V39.615H21.619v15.757a1.5 1.5 0 0 1-3 0V38.115a1.5 1.5 0 0 1 1.5-1.5h23.762a1.5 1.5 0 0 1 1.5 1.5V55.48a1.5 1.5 0 0 1-1.5 1.5Z"
                            />
                        </svg>
                        <h1 className={styles.section}>Store List</h1>
                    </div>

                    <div className={styles.btns}>
                        <button
                            className={styles.tag + ' ' + styles.btn}
                            onClick={changePage}
                        >
                            <span>+</span>
                            New Store
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StoreListHeader
