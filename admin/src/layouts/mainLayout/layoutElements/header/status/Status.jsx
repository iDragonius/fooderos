import styles from '../Header.module.scss'
import { useRef, useState } from 'react'

const Status = () => {
    const [status, setStatus] = useState('Offline')
    const online = useRef()

    return (
        <div className={styles.status}>
            <span className={styles.statusCont}>{status}</span>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    ref={online}
                    onClick={() =>
                        online.current.checked
                            ? setStatus('Online')
                            : setStatus('Offline')
                    }
                />
                <span className={styles.slider + ' ' + styles.round}></span>
            </label>
        </div>
    )
}

export default Status
