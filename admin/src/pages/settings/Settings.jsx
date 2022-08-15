import React, { useRef } from 'react'
import styles from './Settings.module.scss'
import MainHeader from './headers/mainHeader/MainHeader'
import { useCreateLanguageMutation } from '../../store/slices/api/langApiSlice'
import { toast } from 'react-toastify'
const Settings = () => {
    const [createLang] = useCreateLanguageMutation()
    const langRef = useRef()
    const create = async (e) => {
        e.preventDefault()
        await createLang({
            name: langRef.current.value,
        }).then(() => {
            langRef.current.value = ''
            toast.success('Language created successful')
        })
    }
    return (
        <div className={'w-full'}>
            <MainHeader />

            <div className={styles.main}>
                <div className={styles.lang}>
                    <input
                        type="text"
                        placeholder={'New language'}
                        ref={langRef}
                    />
                    <button onClick={create}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default Settings
