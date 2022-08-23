import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useCreateStoreMutation } from '../../../../store/slices/api/storeApiSlice'
import { toast } from 'react-toastify'
import styles from '../../../tagList/headers/Header.module.scss'
import arrow from '../../../../assets/img/pages/arrow.png'

const StoreEditHeader = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const back = () => {
        navigate(`/store/${location.pathname.split('/')[2]}/list`)
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <div className={styles.name} onClick={back}>
                        <h1 className={styles.section}>
                            <img src={arrow} alt="" />
                        </h1>
                        <h1 className={styles.section}> Edit Store</h1>
                    </div>

                    <div className={styles.btns}>
                        <button className={styles.tag + ' ' + styles.btn}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StoreEditHeader
