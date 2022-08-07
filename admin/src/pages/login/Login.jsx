import styles from './Login.module.scss'
import left from '../../assets/img/login.png'
import { useState } from 'react'
import Auth from './auth/Auth'
import Otp from './otp/Otp'
const Login = () => {
    const [step, setStep] = useState(false)

    return (
        <div className={styles.cont}>
            <div
                className={styles.left}
                style={{ backgroundImage: `url(${left})` }}
            ></div>
            <div className={styles.right}>
                <div className={styles.circleMain}>
                    <div className={styles.circle}></div>
                </div>
                {step ? (
                    <Otp setStep={setStep} step={step} />
                ) : (
                    <Auth setStep={setStep} />
                )}
            </div>
        </div>
    )
}

export default Login
