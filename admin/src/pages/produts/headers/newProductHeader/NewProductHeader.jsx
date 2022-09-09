import React from 'react'
import styles from '../../../tagList/headers/Header.module.scss'
import arrow from '../../../../assets/img/pages/arrow.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { allSteps } from '../../../../store/slices/productSlice'

const NewProductHeader = ({ setActive, active, file }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const back = () => {
        navigate(`/products/${location.pathname.split('/')[2]}/list`)
    }
    const steps = useSelector(allSteps)

    const change = () => {
        const sections = ['General Info', 'Variant Info', 'Add on', 'Review']
        const i = sections.indexOf(active) + 1

        if (sections.indexOf(active) === 3) {
            return
        }
        setActive(steps[steps.indexOf(active) + 1])
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <div className={styles.name} onClick={back}>
                        <h1 className={styles.section}>
                            <img src={arrow} alt="arrow" />
                        </h1>
                        <h1 className={styles.section}> New Product</h1>
                    </div>

                    <div className={styles.btns}>
                        {active === 'Review' ? (
                            <button className={styles.tag + ' ' + styles.btn}>
                                Save
                            </button>
                        ) : (
                            <button
                                className={styles.tag + ' ' + styles.btn}
                                onClick={change}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewProductHeader
