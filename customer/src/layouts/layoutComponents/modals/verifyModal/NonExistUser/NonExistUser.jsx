import React, { useEffect, useRef, useState } from 'react'
import styles from '../VerifyModal.module.scss'
import { toast } from 'react-toastify'

import {useDispatch, useSelector} from 'react-redux'
import {useLoginMutation} from "../../../../../store/slices/api/authApiSlice";
import {setAuth, setCredentials} from "../../../../../store/slices/authSlice";
import {visitorToken} from "../../../../../store/slices/authSlice";

const NonExistUser = ({ setStep, step, setOpen }) => {
    const [seconds, setSeconds] = useState()
    const [minutes, setMinutes] = useState()
    const dispatch = useDispatch()
    const [login] = useLoginMutation()
    const otpRef = useRef()
    const nameRef = useRef()
    const visitToken = useSelector(visitorToken)

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

    const handleVerify = async (e) => {

        e.preventDefault()
        if (!otpRef.current.value) {
            return toast.warn('OTP input must be filled out')
        }

        if (!nameRef.current.value) {
            return toast.warn('Name input must be filled out')
        }

        await login({
                phone: sessionStorage.getItem('phone'),
                otp: otpRef.current.value,
                name: nameRef.current.value,
                token:visitToken
            })
            .unwrap()
            .then((data) => {
                    toast.success('User registered successful!')
                    dispatch(setCredentials({name:nameRef.current.value, token:data.token}))
                    localStorage.setItem('token', data.token)
                    dispatch(setAuth(true))
                    setStep(false)
                    setOpen(false)
            })
            .catch((e) => {
                if (e.status === 401) {
                    toast.error('User blocked for 24h')
                }
                if (e.status === 400) {
                    toast.error('Invalid OTP')
                }
            })
    }
    return (
        <>
            <h1 className={styles.title}>Enter the OTP code</h1>
            <div>
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
                <div>
                    <p className={styles.inputTitle}>Full name</p>
                    <input
                        type="text"
                        placeholder={'Full name'}
                        className={styles.formInput}
                        ref={nameRef}
                    />
                </div>
                <button className={styles.verifyButton} onClick={handleVerify}>
                    Continue
                </button>
            </div>
        </>
    )
}

export default NonExistUser
