import React from 'react'
import styles from '../LoginModal.module.scss'
import ReCAPTCHA from 'react-google-recaptcha'
const Recaptcha = ({ change, refTo }) => {
    const key = '6LexJUchAAAAAEkbZCxZMQnC02eoNTHNEfHi8VlE'
    return (
        <div className={styles.recaptcha}>
            <ReCAPTCHA sitekey={key} onChange={change} ref={refTo} />
        </div>
    )
}

export default Recaptcha
