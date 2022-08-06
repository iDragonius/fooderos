import React, { useState } from 'react'
import styles from './ImageUpload.module.scss'
import { useUploadFileMutation } from '../../../../../store/slices/api/userApiSlice'

const ImageUpload = () => {
    const [file, setFile] = useState()
    const [updateImg, { isLoading }] = useUploadFileMutation()
    const changeImg = async (e) => {
        e.preventDefault()
        await updateImg(file).then(() => {
            e.target.value = null
        })
    }

    return (
        <div className={styles.main}>
            <input
                type="file"
                name={'image'}
                onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={changeImg} className={styles.btn}>
                Change
            </button>
        </div>
    )
}

export default ImageUpload
