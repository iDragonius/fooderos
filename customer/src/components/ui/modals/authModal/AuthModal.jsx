import React from 'react'
import styles from './AuthModal.module.scss'
const AuthModal = ({ open, setOpen, setStep, children }) => {
    const closeModal = () => {
        setStep(false)
        setOpen(false)
    }
    return (
        <div className={open ? styles.main : 'hidden'} onClick={closeModal}>
            <div
                className={
                    'w-full min-h-screen md:min-h-max md:h-max  h-60 bg-white mt-20 md:mt-24 md:w-[600px] rounded-md p-6 relative transition-all'
                }
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.xContainer} onClick={closeModal}>
                    <i>
                        <svg
                            viewBox="64 64 896 896"
                            focusable="false"
                            fill="rgba(0,0,0,0.5)"
                            aria-hidden="true"
                            className={styles.x}
                        >
                            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                        </svg>
                    </i>
                </div>

                {children}
            </div>
        </div>
    )
}

export default AuthModal
