import React from 'react'
import styles from './Login.module.scss'
import left from '../../assets/img/login.png'
import {Link} from "react-router-dom";
const Login = () => {
    return (
        <div className={styles.cont}>
            <div className={styles.left} style={{backgroundImage:`url(${left})`}}></div>
            <div className={styles.right}>
                <div className={styles.circleMain}>
                    <div className={styles.circle}></div>
                </div>
                <h1 className={styles.title}>Welcome to Fooderos</h1>
                <p className={styles.description}>Please enter your phone number and Log in</p>

                <div className={styles.form}>
                    <div className={styles.cc}>
                        <label className={styles.label}>Code</label>
                        <div className={styles.code}>+994</div>
                    </div>
                    <div className={styles.phone}>
                        <label className={styles.phoneLabel}>Phone Number</label>
                        <input type="text" className={styles.input} placeholder={'0775100550'}/>
                    </div>
                </div>
                <button className={styles.btn}>Log In</button>
                <p className={styles.agreement}>By signing in you agree with <Link to={'/login'} className={styles.terms}> Terms and Conditions</Link></p>
            </div>
        </div>
    )
}

export default Login
