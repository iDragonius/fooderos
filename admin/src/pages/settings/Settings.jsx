import React, { useRef } from 'react'
import styles from './Settings.module.scss'
import MainHeader from './headers/mainHeader/MainHeader'
import {
    useCreateLanguageMutation,
    useDeleteLanguageMutation,
    useLanguagesQuery,
} from '../../store/slices/api/langApiSlice'
import { toast } from 'react-toastify'
const Settings = () => {
    const [createLang] = useCreateLanguageMutation()
    const [deleteLang] = useDeleteLanguageMutation()
    const { data: languages, isSuccess } = useLanguagesQuery()
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
    const deleteLanguage = async (e) => {
        e.preventDefault()
        await deleteLang({
            name: e.target.parentNode.childNodes[0].innerHTML,
        })
    }

    return (
        <div className={'w-full'}>
            <MainHeader />

            <div className={styles.main}>
                <div className={styles.langlist}>
                    <h1 className={'text-xl font-medium mb-4 mt-3'}>
                        Languages
                    </h1>
                    <div>
                        {isSuccess && (
                            <>
                                {languages.map((lang) => (
                                    <div
                                        key={lang.id}
                                        className={
                                            'flex items-center justify-between py-3 px-4 rounded-md border-[1px] mb-4'
                                        }
                                    >
                                        <div>{lang.lang}</div>
                                        <button
                                            onClick={deleteLanguage}
                                            className={
                                                'px-5 py-2 bg-primary rounded-md text-white'
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>

                <div className={styles.lang}>
                    <h1>New Language</h1>
                    <div className={'flex justify-between'}>
                        <input type="text" placeholder={'Az'} ref={langRef} />
                        <button onClick={create}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
