import React from 'react'
import styles from '../../../tagList/headers/Header.module.scss'
import arrow from '../../../../assets/img/pages/arrow.png'
import { useNavigate } from 'react-router-dom'

const NewBranchHeader = () => {
    const navigate = useNavigate()
    const back = () => {
        navigate(`/branches/list`)
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <div className={styles.name} onClick={back}>
                        <h1 className={styles.section}>
                            <img src={arrow} alt="" />
                        </h1>
                        <h1 className={styles.section}> New Branch</h1>
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

export default NewBranchHeader
