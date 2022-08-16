import React from 'react'
import styles from '../../../tagList/headers/Header.module.scss'
import { useNavigate } from 'react-router-dom'
import arrow from '../../../../assets/img/pages/arrow.png'

const NewStoreHeader = () => {
    const navigate = useNavigate()
    const back = () => {
        navigate('/store/userListHeader')
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <div className={styles.name} onClick={back}>
                        <h1 className={styles.section}>
                            <img src={arrow} alt="" />
                        </h1>
                        <h1 className={styles.section}> New Store</h1>
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

export default NewStoreHeader
