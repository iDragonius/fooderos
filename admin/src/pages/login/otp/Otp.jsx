import React, { useEffect, useRef, useState } from 'react'
import styles from '../Login.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectCurrentName,
    setCredentials,
    setSkip,
    visitorToken,
} from '../../../store/slices/authSlice'
import { useLoginMutation } from '../../../store/slices/api/authApiSlice'
import { toast } from 'react-toastify'

const Otp = ({ setStep, step }) => {
    const name = useSelector(selectCurrentName)
    const otpRef = useRef()
    const [login] = useLoginMutation()
    const [seconds, setSeconds] = useState()
    const [minutes, setMinutes] = useState()
    const token = useSelector(visitorToken)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let timer
    useEffect(() => {
        if (step) {
            setSeconds(0)
            setMinutes(3)
        }
    }, [step])
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
    const handleLogin = async (e) => {
        e.preventDefault()
        if (!otpRef.current.value) {
            toast.warn('Security code input must be filled out')
        }
        await login({
            phone: sessionStorage.getItem('phone'),
            otp: otpRef.current.value,
            token,
        })
            .unwrap()
            .then((res) => {
                dispatch(setCredentials({ token: res.token, authorized: true }))
                localStorage.setItem('token', res.token)
                dispatch(setSkip(false))
                navigate('/')
                toast.success(`Logged in as ${name}`)
            })
    }
    return (
        <>
            <h1 className={styles.title}>Verification</h1>
            <p className={styles.description}>
                Dear, {name} please enter your verification code which sent to{' '}
                <span className={styles.phoneNumber}>
                    {sessionStorage.getItem('phone')}
                </span>
            </p>

            <div className={styles.form}>
                <div className={styles.phoneOpt}>
                    <input
                        type="text"
                        name={'login'}
                        className={styles.inp}
                        required={true}
                        ref={otpRef}
                    />
                    <label htmlFor={'login'} className={styles.phoneL}>
                        Security Code
                    </label>
                </div>
            </div>
            <div className={styles.btnSec}>
                <div className={styles.timerSec}>
                    Code expires in:{' '}
                    <span className={styles.timer}>
                        {minutes}:{seconds}
                    </span>
                </div>
                <button className={styles.btnOtp} onClick={handleLogin}>
                    Continue
                </button>
            </div>

            <p className={styles.resend}>
                Didn’t receive a code?{''} <span>Resend</span>
            </p>
        </>
    )
}

export default Otp
