import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    branchCatalogData,
    selectedCatalogs,
} from '../../../../../store/slices/branchCatalogSlice'

const Review = () => {
    const selCatalogs = useSelector(selectedCatalogs)
    const catalogs = useSelector(branchCatalogData)

    return (
        <div className={'bg-white'}>
            <h1
                className={
                    'px-10 border-b-[1px] text-[24px] py-6 font-semibold mb-10'
                }
            >
                Review
            </h1>
            <div
                className={
                    'ml-10  mb-32 text-[#37383a] text-[18px] w-max bg-white  mb-10 '
                }
            >
                {catalogs.map((catalog) => {
                    const catalogSubs = catalog.filter((data, i) => i !== 0)
                    return (
                        <div className={'w-[900px]'} key={catalog[0].id}>
                            {selCatalogs.includes(String(catalog[0].id)) && (
                                <div
                                    className={
                                        ' px-6 flex items-center min-h-[80px]'
                                    }
                                >
                                    <img
                                        src={`http://192.168.202.52:81/storage/catagory/images/${catalog[0].image}`}
                                        alt=""
                                        className={'mr-4'}
                                        width={48}
                                        height={48}
                                    />

                                    <span> {catalog[0].name}</span>
                                    <span className={'hidden'}>
                                        {catalog[0].id}
                                    </span>
                                </div>
                            )}
                            {catalogSubs[0].map((sub1, i) => {
                                const catalogSubSubs = sub1.filter(
                                    (data, i) => i !== 0
                                )
                                return (
                                    <div key={sub1[0].id}>
                                        {selCatalogs.includes(
                                            String(sub1[0].id)
                                        ) && (
                                            <div
                                                className={
                                                    'pl-[100px]  px-6  flex items-center min-h-[80px]'
                                                }
                                            >
                                                <img
                                                    src={`http://192.168.202.52:81/storage/catagory/images/${sub1[0].image}`}
                                                    alt=""
                                                    className={'mr-4'}
                                                    width={48}
                                                    height={48}
                                                />

                                                <span>{sub1[0].name}</span>
                                                <span className={'hidden'}>
                                                    {sub1[0].id}
                                                </span>
                                            </div>
                                        )}
                                        {catalogSubSubs.map((sub2) => {
                                            return (
                                                <div key={sub2[0].id}>
                                                    {selCatalogs.includes(
                                                        String(sub2[0].id)
                                                    ) && (
                                                        <div
                                                            className={
                                                                ' pl-[150px]  px-6  flex items-center min-h-[80px]'
                                                            }
                                                        >
                                                            <img
                                                                src={`http://192.168.202.52:81/storage/catagory/images/${sub2[0].image}`}
                                                                alt=""
                                                                className={
                                                                    'mr-4'
                                                                }
                                                                width={48}
                                                                height={48}
                                                            />

                                                            <span>
                                                                {sub2[0].name}
                                                            </span>
                                                            <span
                                                                className={
                                                                    'hidden'
                                                                }
                                                            >
                                                                {sub2[0].id}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Review
