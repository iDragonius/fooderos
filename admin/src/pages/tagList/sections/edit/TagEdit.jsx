import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    currentId,
    currImage,
    descs,
    tags,
} from '../../../../store/slices/languageSlice'
import {
    useShowTagQuery,
    useTagTypeQuery,
} from '../../../../store/slices/api/tagApiSlice'
import TagEditHeader from '../../headers/TagEditHeader'
import EditLanguages from '../../languages/EditLanguages'
import { useLocation } from 'react-router-dom'
import styles from '../newTag/NewTag.module.scss'
import ImgUpload from '../newTag/imgUpload/ImgUpload'

const TagEdit = () => {
    const currTags = useSelector(tags)
    const currDescs = useSelector(descs)
    const { data: types, isSuccess } = useTagTypeQuery()
    const [desc, setDesc] = useState()
    const [tag, setTag] = useState()
    const [type, setType] = useState('Restaurant')
    const [file, setFile] = useState([])
    const id = useSelector(currentId)
    const locale = useLocation()
    const image = useSelector(currImage)
    const {
        data,
        refetch,
        isSuccess: success,
    } = useShowTagQuery(locale.pathname.split('/')[3])
    useEffect(() => {
        setDesc(currDescs['Az_desc'])
        setTag(currTags['Az_name'])
        console.log(1)
    }, [success])
    useEffect(() => {
        refetch()
    }, [id])
    const changeType = (e) => {
        setType(e.target.value)
    }
    return (
        <>
            <TagEditHeader desc={desc} type={type} tag={tag} file={file} />
            <EditLanguages
                setTag={setTag}
                setDesc={setDesc}
                type={type}
                tag={tag}
                desc={desc}
            />
            <div>
                <div className={styles.main}>
                    <h1 className={styles.header}>Add new Tag</h1>
                    <div className={styles.cont}>
                        <ImgUpload file={file} setFile={setFile} path={image} />

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
                                                    {types.map((type) => (
                                                        <option
                                                            key={type.id}
                                                            value={type.name}
                                                        >
                                                            {type.name}
                                                        </option>
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

export default TagEdit
