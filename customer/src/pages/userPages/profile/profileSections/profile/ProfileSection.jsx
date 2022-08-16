import styles from './ProfileSection.module.scss'
import { useRef } from 'react'
import {
    useGetProfileQuery,
    useUpdateProfileMutation,
} from '../../../../../store/slices/api/userApiSlice'
import { useDispatch } from 'react-redux'
import { setImage, setName } from '../../../../../store/slices/userInfoSlice'
import ImageUpload from '../../ui/imageUpload/ImageUpload'

const ProfileSection = () => {
    const birthdayRef = useRef()
    const nameRef = useRef()
    const genderRef = useRef()
    const dispatch = useDispatch()
    const [update] = useUpdateProfileMutation()

    const { data, isSuccess } = useGetProfileQuery()

    const handleProfile = async (e) => {
        e.preventDefault()

        await update({
            name: nameRef.current.value,
            gender: genderRef.current.value,
            birthday: birthdayRef.current.value,
        })
            .unwrap()
            .then(() => {
                dispatch(setName(nameRef.current.value))
                dispatch(setImage(data.photo))
            })
    }

    return (
        <>
            <ImageUpload />
            {isSuccess && (
                <div className={styles.main}>
                    <div className={styles.header}>
                        Enter your personal information
                    </div>
                    <div className={styles.content}>
                        <div className={styles.input}>
                            <label>Full name</label>
                            <input
                                defaultValue={data.name}
                                ref={nameRef}
                                type="text"
                                className={styles.nameInp}
                            />
                        </div>
                        <div className={styles.input}>
                            <label>Phone number</label>
                            <div className={styles.phone}>
                                <div className={styles.cc}>+994</div>
                                <input
                                    type="text"
                                    className={styles.phoneInp}
                                    defaultValue={data.phone.substr(3, 10)}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className={styles.input}>
                            <label>E-mail</label>
                            <input
                                type="text"
                                className={styles.emailInp}
                                defaultValue={data.email}
                                disabled={true}
                            />
                        </div>
                        <div className={styles.input}>
                            <label>Gender</label>
                            <select
                                className={styles.genderSelect}
                                defaultValue={data.gender}
                                ref={genderRef}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className={styles.input}>
                            <label>Birthday</label>
                            <input
                                defaultValue={data.birthday}
                                type={'date'}
                                className={styles.birthdayInp}
                                ref={birthdayRef}
                            />
                        </div>
                        <button className={styles.btn} onClick={handleProfile}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfileSection
