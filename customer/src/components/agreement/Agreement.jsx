import { Link } from 'react-router-dom'
import React from 'react'
import styles from './Agreement.module.scss'
const Agreement = () => {
    return (
        <p className={styles.policy}>
            By clicking the 'Continue' button, I agree with{' '}
            <Link to={'/'} className={styles.links}>
                'Terms & Conditions'
            </Link>{' '}
            and{' '}
            <Link to={'/'} className={styles.links}>
                'Privacy Policy'
            </Link>
        </p>
    )
}

export default Agreement
