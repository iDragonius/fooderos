import React, {useRef, useState} from 'react'
import styles from './NonExistUserSc.module.scss'
import { toast } from 'react-toastify'
import Agreement from '../../../../../../components/agreement/Agreement'
import Recaptcha from "../../recaptcha/Recaptcha";
import axios from "axios";
import {usePhoneMutation} from "../../../../../../store/slices/api/authApiSlice";
import {useSelector} from "react-redux";
import {scProvider} from "../../../../../../store/slices/authSlice";

const NonExistUserSc = ({ setOpen, setStep, setStepSc }) => {
    const phoneRef = useRef()
    const recaptchaRef = useRef()
    const [phone] = usePhoneMutation()
    const [key,setKey]= useState()
    const sc = useSelector(scProvider)
    const [verified, setVerified] = useState(false)
    const handleRegister =  async (e) => {
        e.preventDefault()

        if(verified){
            await phone({
                phone: `+994${phoneRef.current.value}`,
                reKey: key,
                social_providers:sc
            })
            localStorage.setItem('name', sessionStorage.getItem('name'))
            sessionStorage.setItem('phone', `+994${phoneRef.current.value}`)
            setStepSc(true)
            localStorage.setItem('token', sessionStorage.getItem('sessionToken'))
        }



    }
    const change = (res) => {
        setVerified(true)
        setKey(res)
    }
    return (
        <>
            <h1 className={styles.title}>Enter your phone number</h1>
            <p className={styles.description}>
                Please link your mobile number to1 this account.
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
                <Recaptcha change={change} refTo={recaptchaRef} />
                <button className={styles.loginButton} onClick={handleRegister}>
                    Continue
                </button>
            </div>
            <Agreement />
        </>
    )
}

export default NonExistUserSc
