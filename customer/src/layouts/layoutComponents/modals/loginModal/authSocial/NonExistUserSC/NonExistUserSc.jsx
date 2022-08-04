import React, { useRef } from 'react'
import styles from './NonExistUserSc.module.scss'
import { toast } from 'react-toastify'
import Agreement from '../../../../../../components/agreement/Agreement'

const NonExistUserSc = ({ setOpen, setStep, setStepSc }) => {
    const phoneRef = useRef()
    const handleRegister = (e) => {
        e.preventDefault()
        if (!phoneRef.current.value) {
            return toast.warn('Phone input must be filled out')
        }

        localStorage.setItem('name', sessionStorage.getItem('name'))
        sessionStorage.setItem('phone', `+994${phoneRef.current.value}`)
        setStepSc(true)
        localStorage.setItem('token', sessionStorage.getItem('sessionToken'))
    }
    return (
        <>
            <h1 className={styles.title}>Enter your phone number</h1>
            <p className={styles.description}>
                Please link your mobile number to this account.
            </p>
            <div>
                <p className={styles.loginContent}>Phone number</p>
                <div className={styles.input}>
                    <span className={styles.cc}>+994</span>
                    <span className={styles.inputContainer}>
                        <input
                            type={'text'}
                            className={styles.phoneInput}
                            placeholder={'775105005'}
                            ref={phoneRef}
                        />
                    </span>
                </div>
                <button className={styles.loginButton} onClick={handleRegister}>
                    Continue
                </button>
            </div>
            <Agreement />
        </>
    )
}

export default NonExistUserSc
