import React from 'react'
import styles from '../../../tagList/headers/Header.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'

const ProductListHeader = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const changePage = (e) => {
        e.preventDefault()
        navigate(`/products/${location.pathname.split('/')[2]}/new`)
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <div className={styles.name}>
                        <svg
                            version="1.1"
                            fill={'#fff'}
                            height={24}
                            width={24}
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 483.809 483.809"
                        >
                            <g>
                                <g>
                                    <polygon
                                        points="390.611,119.602 483.809,65.746 476.982,50.548 359.666,89.442 336.832,142.263 173.758,142.263 173.758,182.925
			197.291,182.925 229.261,431.905 390.742,431.905 422.713,182.925 446.244,182.925 446.244,142.263 380.814,142.263 		"
                                    />
                                    <polygon points="187.177,308.452 19.289,308.452 0,327.741 0,328.252 19.289,347.54 192.196,347.54 		" />
                                    <path d="M176.17,222.733H85.31c-32.697,0-59.205,26.506-59.205,59.206v7.026h158.57L176.17,222.733z" />
                                    <path
                                        d="M26.105,367.028v7.026c0,32.698,26.508,59.206,59.205,59.206h100.936c5.782,0,11.367-0.844,16.65-2.391l-8.197-63.842
			H26.105z"
                                    />
                                </g>
                            </g>
                        </svg>
                        <h1 className={styles.section}>Product List</h1>
                    </div>

                    <div className={styles.btns}>
                        <button
                            className={styles.tag + ' ' + styles.btn}
                            onClick={changePage}
                        >
                            <span>+</span>
                            New Product
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductListHeader
