import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    addonData,
    combData,
    currLang,
    generalInfo,
    localDescription,
    localNames,
} from '../../../../../store/slices/productSlice'
import ImgUpload from '../imgUpload/ImgUpload'

const Review = ({ file }) => {
    const general = useSelector(generalInfo)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const names = useSelector(localNames)
    const descriptions = useSelector(localDescription)
    const language = useSelector(currLang)
    const combinations = useSelector(combData)
    const addons = useSelector(addonData)
    const lang = useSelector(currLang)

    useEffect(() => {
        setDescription(descriptions[`${language}_description`])
        setName(names[`${language}_name`])
    }, [language])
    return (
        <div className={'flex'}>
            <div className={'mr-20'}>
                <ImgUpload file={file} />
            </div>
            <div>
                <h1 className={'font-semibold text-[24px] mb-5'}>{name}</h1>
                <p className={'text-[16px] mb-6'}>{description}</p>
                <p className={'font-semibold text-[24px] mb-5'}>
                    {general.price}AZN
                </p>
                {general.isVariants && (
                    <div className={'mt-8'}>
                        <p className={'mb-6 text-[16px] font-bold'}>
                            Choose variant
                        </p>
                        {Object.keys(combinations).map((combination) => (
                            <div className={'flex text-[16px]'}>
                                <div className={'mr-10 min-w-[200px]'}>
                                    <input type="checkbox" className={'mr-3'} />
                                    <span>{combination}</span>
                                </div>
                                <p>{combinations[combination].price} AZN</p>
                            </div>
                        ))}
                    </div>
                )}

                {general.isAddons && (
                    <div className={'mt-8 mb-20'}>
                        <p className={'mb-6 ext-[16px] font-bold'}>
                            Choose add on
                        </p>
                        {addons.map((addon) => (
                            <div className={'flex text-[16px]'}>
                                <div className={'mr-10 min-w-[200px]'}>
                                    <input type="checkbox" className={'mr-3'} />
                                    <span>{addon[`${lang}_name`]}</span>
                                </div>
                                <p>{addon.price} AZN</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Review
