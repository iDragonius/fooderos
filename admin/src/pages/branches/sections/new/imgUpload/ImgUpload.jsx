import styles from '../NewBranch.module.scss'
import { useDropzone } from 'react-dropzone'

const ImgUpload = ({ file, setFile, path }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            setFile(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
        },
    })
    const thumbs = file?.map((files) => (
        <div key={files.name}>
            <div>
                <img
                    src={files.preview}
                    onLoad={() => {
                        URL.revokeObjectURL(files.preview)
                    }}
                    alt={''}
                />
            </div>
        </div>
    ))
    return (
        <>
            {path ? (
                <>
                    {file[0] ? (
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
                            <div>
                                <img
                                    src={`http://192.168.202.52:81/storage/branch/profiles/${path}`}
                                    alt=""
                                />
                            </div>

                            <input {...getInputProps()} />
                        </div>
                    )}
                </>
            ) : (
                <>
                    {file[0] ? (
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
                                <p className={styles.orr}>
                                    or drop file to upload
                                </p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default ImgUpload
