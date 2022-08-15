import styles from './NewTag.module.scss'
import ImgUpload from './imgUpload/ImgUpload'

import { useTagTypeQuery } from '../../../../store/slices/api/tagApiSlice'
import NewTagHeader from '../../headers/NewTagHeader'
import NewTagLanguages from '../../languages/NewTagLanguages'
import { useRef, useState } from 'react'

const NewTag = () => {
    const { data, isSuccess } = useTagTypeQuery()
    const [desc, setDesc] = useState('')
    const [tag, setTag] = useState('')
    const [type, setType] = useState('Restaurant')
    const [file, setFile] = useState([])
    const typeRef = useRef()
    const changeType = (e) => {
        setType(e.target.value)
    }
    return (
        <>
            <NewTagHeader
                section={'NewTag'}
                desc={desc}
                type={type}
                tag={tag}
                file={file}
            />
            <NewTagLanguages
                desc={desc}
                type={type}
                tag={tag}
                setTag={setTag}
                setDesc={setDesc}
            />
            <div>
                <div className={styles.main}>
                    <h1 className={styles.header}>Add new Tag</h1>
                    <div className={styles.cont}>
                        <ImgUpload file={file} setFile={setFile} />
                        <div className={'flex flex-col '}>
                            <div className={'flex'}>
                                <div className={styles.tagName}>
                                    <div className={styles.phoneOpt}>
                                        <input
                                            type="text"
                                            className={styles.inp}
                                            required={true}
                                            onChange={(e) =>
                                                setTag(e.target.value)
                                            }
                                            value={tag}
                                        />
                                        <label className={styles.phoneL}>
                                            Tag Name
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.tagType}>
                                    <div className={styles.phoneOpt}>
                                        <select
                                            type="text"
                                            className={styles.inp}
                                            required={true}
                                            onChange={changeType}
                                            value={type}
                                        >
                                            {isSuccess && (
                                                <>
                                                    {data.map((type) => (
                                                        <>
                                                            {type.status ===
                                                                1 && (
                                                                <option
                                                                    key={
                                                                        type.id
                                                                    }
                                                                    value={
                                                                        type.name
                                                                    }
                                                                >
                                                                    {type.name}
                                                                </option>
                                                            )}
                                                        </>
                                                    ))}
                                                </>
                                            )}
                                        </select>
                                        <label className={styles.phoneL}>
                                            Tag Type
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={'ml-10 relative mt-[6px]'}>
                                <textarea
                                    name=""
                                    id=""
                                    rows="3"
                                    className={styles.textArea}
                                    onChange={(e) => setDesc(e.target.value)}
                                    value={desc}
                                ></textarea>
                                <label className={styles.textAre}>
                                    Description
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewTag
