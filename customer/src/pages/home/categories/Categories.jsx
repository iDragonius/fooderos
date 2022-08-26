import React, { useEffect } from 'react'
import { useTagsQuery } from '../../../store/slices/api/tagApiSlice'
import styles from './Categories.module.scss'
const Categories = ({ type }) => {
    const { data: categories, isSuccess, refetch } = useTagsQuery(type)
    useEffect(() => {
        refetch()
    }, [type])
    return (
        <div className={'mt-10'}>
            <h1 className={'text-[34px] font-semibold'}>Categories</h1>
            <div className={'flex py-6'}>
                {isSuccess && (
                    <>
                        {categories.map((category) => (
                            <div className={styles.cont}>
                                <div className={styles.contImage}>
                                    <img
                                        src={`http://192.168.202.52:81/storage/tags/images/${category.image}`}
                                        alt=""
                                    />
                                </div>

                                <div>{category.name}</div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Categories
