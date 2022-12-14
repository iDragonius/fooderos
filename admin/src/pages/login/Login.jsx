import styles from './Login.module.scss'
import left from '../../assets/img/login.png'
import { useEffect, useState } from 'react'
import Auth from './auth/Auth'
import Otp from './otp/Otp'
import { useVisitorMutation } from '../../store/slices/api/visitorApiSlice'
import { setVisitorToken } from '../../store/slices/authSlice'
import { useDispatch } from 'react-redux'
const Login = () => {
    const dispatch = useDispatch()
    const [step, setStep] = useState(false)
    const [visitor, { isLoading: loading }] = useVisitorMutation()

    const createVisitor = async () => {
        await visitor()
            .unwrap()
            .then((res) => dispatch(setVisitorToken(res.token)))
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            createVisitor()
        }
    }, [])
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
