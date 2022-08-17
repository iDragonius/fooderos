import React, { useState } from 'react'
import CommonDropdown from '../../../../../../components/dropdown/commonDropdown/CommonDropdown'
import { useLanguagesQuery } from '../../../../../../store/slices/api/langApiSlice'
import up from '../../../../../../assets/img/arrowUp.png'
import down from '../../../../../../assets/img/downSide.png'
const UserDropdown = ({ view, currLang, setCurrLang }) => {
    const { data: languages, isSuccess } = useLanguagesQuery()
    const [langView, setLangView] = useState(false)
    return (
        <CommonDropdown view={view} width={220} margintop={30} r={0}>
            <div className={'px-3 py-4'}>
                <div>
                    <div
                        className={
                            'flex justify-between cursor-pointer border-b-[1px]  select-none py-2 px-3 hover:bg-primary hover:text-white hover:rounded-md'
                        }
                        onClick={() =>
                            langView ? setLangView(false) : setLangView(true)
                        }
                    >
                        <p>{currLang}</p>
                        <>
                            {langView ? (
                                <img
                                    src={down}
                                    alt="down"
                                    width={16}
                                    height={16}
                                />
                            ) : (
                                <img src={up} alt="up" width={16} height={16} />
                            )}
                        </>
                    </div>

                    <div className={langView ? '' : 'hidden'}>
                        {isSuccess && (
                            <>
                                {languages.map((lang) => (
                                    <div
                                        key={`lang_${lang.id}`}
                                        className={
                                            'px-5 w-full border-b-[1px] hover:bg-primary hover:text-white hover:rounded-md py-1 cursor-pointer transition-all ease-linear'
                                        }
                                        onClick={() => {
                                            setCurrLang(lang.lang)
                                            localStorage.setItem(
                                                'lang',
                                                lang.lang
                                            )
                                        }}
                                    >
                                        {lang.lang}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </CommonDropdown>
    )
}

export default UserDropdown
