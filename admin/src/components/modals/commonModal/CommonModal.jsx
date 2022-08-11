import styles from './CommonModal.module.scss'
const CommonModal = ({ setOpen, open, children }) => {
    const closeModal = () => {
        document.body.style.overflow = ''

        setOpen(false)
    }
    return (
        <div className={open ? styles.main : 'hidden'} onClick={closeModal}>
            <div className={styles.cont} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default CommonModal
