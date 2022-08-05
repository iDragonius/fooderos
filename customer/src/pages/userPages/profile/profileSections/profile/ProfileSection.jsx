import styles from './ProfileSection.module.scss'
import { useSelector } from 'react-redux'
import { selectCurrentName } from '../../../../../store/slices/authSlice'
import { useEffect, useState } from 'react'
const ProfileSection = () => {
    const name = useSelector(selectCurrentName)
    const [newName, setNewName] = useState(() => (name ? name : ''))

    return (
        <div className={styles.main}>
            <div className={styles.header}>Enter your personal information</div>
            <div className={styles.content}>
                <div className={styles.input}>
                    <label>Full name</label>
                    <input
                        type="text"
                        className={styles.nameInp}
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
                <div className={styles.input}>
                    <label>Phone number</label>
                    <div className={styles.phone}>
                        <div className={styles.cc}>+994</div>
                        <input
                            type="text"
                            className={styles.phoneInp}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className={styles.input}>
                    <label>E-mail</label>
                    <input type="text" className={styles.emailInp} />
                </div>
                <div className={styles.input}>
                    <label>Gender</label>
                    <select className={styles.genderSelect}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className={styles.input}>
                    <label>Birthday</label>
                    <input type={'date'} className={styles.birthdayInp} />
                </div>
            </div>
        </div>
    )
}

export default ProfileSection
