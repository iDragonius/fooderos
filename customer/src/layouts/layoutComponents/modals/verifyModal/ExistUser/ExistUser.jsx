import React, { useState, useEffect, useRef } from 'react'
import styles from '../VerifyModal.module.scss'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../../../../store/slices/api/authApiSlice'
import {
    selectCurrentName,
    setAuth,
    setCredentials,
} from '../../../../../store/slices/authSlice'

const ExistUser = ({ setStep, step, setOpen, stepSc, sc }) => {
    const dispatch = useDispatch()
    const [seconds, setSeconds] = useState()
    const [minutes, setMinutes] = useState()
    const [login] = useLoginMutation()
    const name = useSelector(selectCurrentName)

    const otpRef = useRef()
    let timer
    useEffect(() => {
        if (step) {
            setSeconds(0)
            setMinutes(3)
        }
    }, [step, stepSc])

    useEffect(() => {
        if (seconds === 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
        }
        if (minutes === 0 && seconds === 0) {
            setStep(false)
        }
        timer = setInterval(() => {
            setSeconds(seconds - 1)
        }, 1000)
        return () => clearInterval(timer)
    })

    const handleVerify = async (e) => {
        e.preventDefault()
        if (!otpRef.current.value) {
            return toast.warn('OTP input is empty')
        }
        try {
            let userData
            if(sc){
                userData = await login({
                    phone: sessionStorage.getItem('phone'),
                    otp: otpRef.current.value,
                    email: sessionStorage.getItem('email'),
                    name:name
                }).unwrap()
            } else {
                userData = await login({
                    phone: sessionStorage.getItem('phone'),
                    otp: otpRef.current.value
                }).unwrap()
            }


            dispatch(setCredentials({ token: userData.token, name }))

            toast.success('Login is successful!')
            dispatch(setAuth(true))
            localStorage.setItem('token', userData.token)

            setStep(false)
            setOpen(false)
        } catch (e) {
            if (e.status === 401) {
                toast.error('User blocked for 24h')
            }
            if (e.status === 400) {
                toast.error('Invalid OTP')
            }
        }
    }
    return (
        <>
            <h1 className={styles.title}>Enter the OTP code</h1>
            <p className={styles.content}>
                Dear {name} , enter the OTP code sent to{' '}
                {sessionStorage.getItem('phone')}
            </p>
            <div>
                <div className={styles.timerSection}>
                    <p className={styles.timerTitle}>OTP Code</p>
                    <p className={styles.timer}>
                        {minutes}:{seconds}
                    </p>
                </div>
                <input
                    type="text"
                    placeholder={'1234'}
                    className={styles.formInput}
                    ref={otpRef}
                />
            </div>

            <button className={styles.verifyButton} onClick={handleVerify}>
                Continue
            </button>
        </>
    )
}

export default ExistUser
