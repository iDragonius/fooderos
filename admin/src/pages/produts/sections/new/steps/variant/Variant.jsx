import React from 'react'
import Select from 'react-select'
import styles from '../../NewProduct.module.scss'
const customStyles = {
    valueContainer: () => ({
        height: '54px',
        display: 'flex',
        alignItems: 'center',
        marginLeft: '20px',
    }),
    control: (provided) => ({
        ...provided,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        marginTop: '26px',
    }),
    placeholder: () => ({
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        color: '#31373e',
    }),
}
const Variant = ({ key }) => {
    return (
        <div key={key} className={'flex items-center relative mr-52 mb-10'}>
            <Select
                placeholder={'Name'}
                styles={customStyles}
                className={'ml-10 w-1/3'}
            />
            <div className={styles.tagName + ' w-1/3 ml-10'}>
                <div className={styles.phoneOpt}>
                    <input type="text" className={styles.inp} required={true} />
                    <label className={styles.phoneL}>Description</label>
                </div>
            </div>
            <div className={styles.tagName + ' w-1/3 ml-10'}>
                <div className={styles.phoneOpt}>
                    <input type="text" className={styles.inp} required={true} />
                    <label className={styles.phoneL}>Option</label>
                </div>
            </div>
            <button className={'absolute -top-2 right-0'}>remove</button>
        </div>
    )
}

export default Variant
