import styles from './ImgUploads.module.scss'
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
    const thumbs = file.map((files) => (
        <div key={files.name}>
            <div className={'p-3 border-[1px] rounded-md'}>
                <img
                    src={files.preview}
                    className={'w-[88px] h-[88px]'}
                    onLoad={() => {
                        URL.revokeObjectURL(files.preview)
                    }}
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
                            <div className={'p-3 border-[1px] rounded-md'}>
                                <img
                                    src={`http://192.168.202.52:81/storage/catagory/images/${path}`}
                                    className={'w-[88px] h-[88px]'}
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
