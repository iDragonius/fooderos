import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './VariantImg.module.scss'
import { useDispatch } from 'react-redux'
import { setCombinationData } from '../../../../../../../../store/slices/productSlice'

const VariantImg = ({
    setFile,
    file,
    path,
    setAllImgs,
    id,
    allImgs,
    position,
}) => {
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
            let update = {}
            update[id] = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )[0]
            setAllImgs((allImgs) => ({ ...allImgs, ...update }))
        },
    })
    useEffect(() => {
        console.log(id)
        if (allImgs[id]) {
            setFile([allImgs[id]])
        }
    }, [])
    const thumbs = file.map((files) => (
        <div key={files.name}>
            <div className={'p-3 border-[1px] rounded-md'}>
                <img
                    src={URL.createObjectURL(allImgs[id])}
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
                                    src={`http://192.168.202.52:81/storage/product/variants/images/${path}`}
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

export default VariantImg
