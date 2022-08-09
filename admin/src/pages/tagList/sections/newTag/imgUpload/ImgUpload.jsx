import { useState } from 'react'
import styles from '../NewTag.module.scss'
import { useDropzone } from 'react-dropzone'

const ImgUpload = () => {
    const [files, setFiles] = useState([])
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
        },
    })

    const thumbs = files.map((file) => (
        <div key={file.name}>
            <div className={'p-3 border-[1px] rounded-md'}>
                <img
                    src={file.preview}
                    className={'w-[88px] h-[88px]'}
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview)
                    }}
                />
            </div>
        </div>
    ))
    return (
        <>
            {files[0] ? (
                <div
                    {...getRootProps({ className: 'dropzone' })}
                    className={styles.drop}
                >
                    {thumbs}
                    <input {...getInputProps()} />
                </div>
            ) : (
                <div
                    {...getRootProps({ className: 'dropzone' })}
                    className={styles.drop}
                >
                    <input {...getInputProps()} />
                    <div className={'flex flex-col items-center'}>
                        <p className={styles.dropContent}>Add file</p>
                        <p className={styles.orr}>or drop file to upload</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default ImgUpload
