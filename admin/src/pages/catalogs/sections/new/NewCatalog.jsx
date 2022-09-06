import React, { useEffect, useState } from 'react'
import NewCatalogHeader from '../../headers/newCatalogHeader/NewCatalogHeader'
import styles from '../../../tagList/sections/newTag/NewTag.module.scss'
import ImgUpload from '../../../tagList/sections/newTag/imgUpload/ImgUpload'
import { useStoresQuery } from '../../../../store/slices/api/storeApiSlice'
import { useLocation } from 'react-router-dom'
import { useCatalogTypesQuery } from '../../../../store/slices/api/catalogApiSlice'
import { useSelector } from 'react-redux'
import { currLanguage } from '../../../../store/slices/userInfoSlice'
import NewCatalogLanguages from '../../languages/newCatalogLanguages/NewCatalogLanguages'

const NewCatalog = () => {
    const [file, setFile] = useState([])
    const [catalog, setCatalog] = useState('')
    const [type, setType] = useState('General')
    const [store, setStore] = useState(null)
    const location = useLocation()
    const currentLanguage = useSelector(currLanguage)
    const { data, isSuccess, refetch } = useCatalogTypesQuery({
        lang: localStorage.getItem('lang'),
        rest: location.pathname.split('/')[2],
    })
    useEffect(() => {
        refetch()
    }, [currentLanguage])
    const [special, setSpecial] = useState(false)
    return (
        <>
            <NewCatalogHeader
                image={file}
                type={type}
                unique={special}
                store={store}
                name={catalog}
            />
            <NewCatalogLanguages setName={setCatalog} name={catalog} />
            <div>
                <div className={styles.main}>
                    <h1 className={styles.header}>Add new Catalog</h1>
                    <div className={styles.cont}>
                        <ImgUpload file={file} setFile={setFile} />
                        <div className={'flex flex-col '}>
                            <div className={'flex mt-10'}>
                                <div className={styles.tagName}>
                                    <div className={styles.phoneOpt}>
                                        <input
                                            type="text"
                                            className={styles.inp}
                                            required={true}
                                            onChange={(e) =>
                                                setCatalog(e.target.value)
                                            }
                                            value={catalog}
                                        />
                                        <label className={styles.phoneL}>
                                            Catalog Name
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.tagType}>
                                    <div className={styles.phoneOpt}>
                                        <select
                                            type="text"
                                            className={styles.inp}
                                            required={true}
                                            onChange={(e) =>
                                                setType(e.target.value)
                                            }
                                            value={type}
                                        >
                                            <option value={0} key={'general'}>
                                                General
                                            </option>
                                            {isSuccess && (
                                                <>
                                                    {data.catagories.map(
                                                        (type, i) => (
                                                            <option
                                                                key={`tag12_${type}+${i}`}
                                                                value={type}
                                                            >
                                                                {type}
                                                            </option>
                                                        )
                                                    )}
                                                </>
                                            )}
                                        </select>
                                        <label className={styles.phoneL}>
                                            Parent Name
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.main}>
                    <h1 className={styles.header}>Catalog Type</h1>
                    <div className={styles.cont}>
                        <div className={'flex flex-col '}>
                            <div>
                                <input
                                    type="checkbox"
                                    required={true}
                                    onChange={(e) =>
                                        setSpecial(e.target.checked)
                                    }
                                    checked={special}
                                />
                                <label
                                    className={
                                        'ml-2 text-[#424b56] text-[20px]'
                                    }
                                >
                                    Is this catalog private to any Store?
                                </label>
                            </div>
                            <div
                                className={
                                    special
                                        ? styles.tagType + ' mt-16'
                                        : 'hidden'
                                }
                            >
                                <div className={styles.phoneOpt}>
                                    <select
                                        type="text"
                                        className={styles.inp}
                                        required={true}
                                        onChange={(e) =>
                                            setStore(e.target.value)
                                        }
                                        value={store}
                                    >
                                        {isSuccess && (
                                            <>
                                                {data.stores.map((store, i) => (
                                                    <>
                                                        <option
                                                            value={store}
                                                            key={`tag_${store}+${i}`}
                                                        >
                                                            {store}
                                                        </option>
                                                    </>
                                                ))}
                                            </>
                                        )}
                                    </select>
                                    <label className={styles.phoneL}>
                                        Store Name
                                    </label>
                                </div>
                                <span
                                    className={
                                        'text-[#9a9fa5] text-[14px] ml-4'
                                    }
                                >
                                    Please select store name
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewCatalog
