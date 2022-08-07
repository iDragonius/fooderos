import React, { useRef, useState } from 'react'
import styles from '../Login.module.scss'
import Recaptcha from '../recaptcha/Recaptcha'
import { Link } from 'react-router-dom'
import { usePhoneMutation } from '../../../store/slices/api/authApiSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, visitorToken } from '../../../store/slices/authSlice'

const Auth = ({ setStep }) => {
    const phoneRef = useRef()
    const [reKey, setReKey] = useState('')
    const [phone, { isLoading }] = usePhoneMutation()
    const token = useSelector(visitorToken)
    const recaptchaRef = useRef()
    const dispatch = useDispatch()
    const handleLogin = async (e) => {
        if (!phoneRef.current.value) {
            return toast.warn('Phone input must be fullfilled')
        }
        await phone({
            phone: `+994${phoneRef.current.value}`,
            reKey,
            token,
        })
            .unwrap()
            .then((res) => {
                dispatch(setCredentials({ name: res.name }))
                sessionStorage.setItem('phone', `+994${phoneRef.current.value}`)
                setStep(true)
            })
    }
    const change = (res) => {
        setReKey(res)
    }
    return (
        <>
            <h1 className={styles.title}>Welcome to Fooderos</h1>
            <p className={styles.description}>
                Please enter your phone number and Log in
            </p>

            <div className={styles.form}>
                <div className={styles.cc}>
                    <label className={styles.label}>Code</label>
                    <div className={styles.code}>+994</div>
                </div>
                <div className={styles.phone}>
                    <input
                        type="text"
                        name={'login'}
                        className={styles.inp}
                        required={true}
                        ref={phoneRef}
                    />
                    <label htmlFor={'login'} className={styles.phoneL}>
                        Phone number
                    </label>
                </div>
            </div>
            <Recaptcha change={change} refTo={recaptchaRef} />
            <button className={styles.btn} onClick={handleLogin}>
                Log In
            </button>
            <p className={styles.agreement}>
                By signing in you agree with{' '}
                <Link to={'/login'} className={styles.terms}>
                    {' '}
                    Terms and Conditions
                </Link>
            </p>
        </>
    )
}

export default Auth
