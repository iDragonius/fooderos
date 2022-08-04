import logo from '../../../assets/img/logo.svg'
import mobileLogo from '../../../assets/img/mobile_logo.svg'
import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoginModal from '../modals/loginModal/LoginModal'
import VerifyModal from '../modals/verifyModal/VerifyModal'
import User from './authStatus/user/User'
import Guest from './authStatus/guest/Guest'
import NonExistUserSc from '../modals/loginModal/authSocial/NonExistUserSC/NonExistUserSc'
import { useSelector } from 'react-redux'
import { isAuthorized } from '../../../store/slices/authSlice'

const Navbar = () => {
    const [sc, setSc] = useState(false)
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(false)
    const [exist, setExist] = useState(false)
    // const [user, setUser] = useState(false)
    const [view, setView] = useState(false)
    const user = useSelector(isAuthorized)

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         setUser(true)
    //     } else {
    //         setUser(false)
    //     }
    // }, [step])

    return (
        <div className={styles.navbar}>
            {step ? (
                <VerifyModal
                    setOpen={setOpen}
                    open={open}
                    setStep={setStep}
                    step={step}
                    exist={exist}
                    sc={sc}
                />
            ) : (
                <LoginModal
                    setOpen={setOpen}
                    open={open}
                    setStep={setStep}
                    setExist={setExist}
                    setSc={setSc}
                />
            )}

            <div className={styles.cont}>
                <Link to={'/'}>
                    <img
                        src={mobileLogo}
                        alt="mobile_logo"
                        className={styles.mobileLogo}
                    />
                    <img src={logo} alt="logo" className={styles.logo} />
                </Link>
                {user ? (
                    <User view={view} setView={setView} />
                ) : (
                    <Guest setOpen={setOpen} />
                )}
            </div>
        </div>
    )
}

export default Navbar
