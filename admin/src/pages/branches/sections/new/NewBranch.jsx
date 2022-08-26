import React, { useEffect, useState } from 'react'
import NewBranchHeader from '../../headers/newBranchHeader/NewBranchHeader'
import NewBranchLanguages from '../../languages/newBranchLanguage/NewBranchLanguages'
import {
    useCitiesQuery,
    useCountriesQuery,
    usePaymentQuery,
} from '../../../../store/slices/api/branchApiSlice'
import styles from './NewBranch.module.scss'
import Select from 'react-select'
import ImgUpload from './imgUpload/ImgUpload'
import BannerUpload from './bannerUpload/BannerUpload'
import Schedule from './schedule/Schedule'
const customStyles = {
    valueContainer: () => ({
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        width: '200px',
        marginLeft: '20px',
    }),
    control: (provided) => ({
        ...provided,
        border: '1px solid rgba(0, 0, 0, 0.1)',
    }),
    placeholder: () => ({
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        color: '#31373e',
    }),
    multiValue: () => ({
        display: 'flex',
        background: '#f1f4fa',
        alignItems: 'center',
        height: 'max-content',
        marginRight: '5px',
    }),
    multiValueLabel: () => ({
        fontSize: '15px',
        paddingLeft: '8px',
        paddingBlock: '5px',
        paddingRight: '3px',
        color: '#858c99',
    }),
}

const NewBranch = () => {
    const { data: countries, isSuccess } = useCountriesQuery()
    const [allCountries, setAllCountries] = useState([])
    const [allCities, setAllCities] = useState([])
    const [file, setFile] = useState([])
    const [banner, setBanner] = useState([])
    const [defaultVal, setDefaultVal] = useState([])
    const [currentCountry, setCurrentCountry] = useState('Azerbaijan')
    const {
        data: cities,
        isSuccess: success,
        refetch,
    } = useCitiesQuery(currentCountry)
    const { data: payment } = usePaymentQuery()
    useEffect(() => {
        if (isSuccess) {
            setAllCountries([])
            for (let i = 0; i < countries.length; i++) {
                if (countries[i].name === 'Azerbaijan') {
                    setDefaultVal((old) => [...old, i])
                }
                setAllCountries((old) => [
                    ...old,
                    {
                        value: countries[i].name,
                        label: countries[i].emoji + ' ' + countries[i].name,
                    },
                ])
            }
            console.log(defaultVal)
        }
    }, [isSuccess])
    useEffect(() => {
        setAllCities([])
        console.log(success)
        if (success) {
            for (let i = 0; i < cities.length; i++) {
                setAllCities((old) => [
                    ...old,
                    {
                        value: cities[i].name,
                        label: cities[i].name,
                    },
                ])
            }
        }
    }, [success, refetch])
    const changeCountry = (data) => {
        setCurrentCountry(data.value)
    }
    return (
        <>
            <NewBranchHeader />
            <NewBranchLanguages />
            <div className={styles.main}>
                <BannerUpload file={banner} setFile={setBanner} />
                <div className={'flex mt-8 flex-wrap'}>
                    <ImgUpload setFile={setFile} file={file} />
                    <div className={'ml-8'}>
                        <div>
                            <div className={styles.phoneOpt}>
                                <input
                                    type="text"
                                    className={styles.inp}
                                    required={true}
                                />
                                <label className={styles.phoneL}>
                                    Branch Name
                                </label>
                            </div>
                        </div>
                        <div className={styles.form + ' mt-4'}>
                            <div className={styles.cc}>
                                <label className={styles.label}>Code</label>
                                <div className={styles.code}>+994</div>
                            </div>
                            <div className={styles.phone}>
                                <input
                                    type="text"
                                    className={styles.inp}
                                    required={true}
                                />
                                <label
                                    htmlFor={'login'}
                                    className={styles.phoneL}
                                >
                                    Phone number
                                </label>
                            </div>
                        </div>
                        <Select
                            placeholder={'Country'}
                            styles={customStyles}
                            options={allCountries}
                            onChange={changeCountry}
                            className={'w-[528px] mt-4'}
                            defaultValue={allCities[defaultVal[0]]}
                        />
                        <Select
                            placeholder={'City'}
                            className={'w-[528px] mt-4'}
                            styles={customStyles}
                            options={allCities}
                        />
                        <div className={styles.form + ' mt-4'}>
                            <div className={styles.phone}>
                                <input
                                    type="text"
                                    className={styles.inp}
                                    required={true}
                                />
                                <label
                                    htmlFor={'login'}
                                    className={styles.phoneL}
                                >
                                    Location
                                </label>
                            </div>
                            <div className={styles.cc + ' mr-0'}>
                                <div className={styles.code}>Choose</div>
                            </div>
                        </div>
                        <div className={'flex mt-4'}>
                            <Select
                                placeholder={'Currency'}
                                styles={customStyles}
                                className={'w-[260px] mr-2'}
                            />
                            <Select
                                placeholder={'Payment Method'}
                                styles={customStyles}
                                className={'w-[260px]'}
                            />
                        </div>
                        <div className={'flex mt-4'}>
                            <div>
                                <div className={styles.phoneXs + ' mr-2'}>
                                    <input
                                        type="text"
                                        className={styles.inp}
                                        required={true}
                                    />
                                    <label className={styles.phoneL}>
                                        Cash ord. limit
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className={styles.phoneXs}>
                                    <input
                                        type="text"
                                        className={styles.inp}
                                        required={true}
                                    />
                                    <label className={styles.phoneL}>
                                        Amount
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.phoneOpt + ' mt-4'}>
                                <input
                                    type="text"
                                    className={styles.inp}
                                    required={true}
                                />
                                <label className={styles.phoneL}>
                                    Preorder reserve period
                                </label>
                            </div>
                        </div>
                        <div className={'flex mt-8'}>
                            <input type="checkbox" className={'mr-3'} />
                            <p>Maximum delivery distance</p>
                        </div>
                        <div className={styles.phoneOpt + ' mt-4'}>
                            <input
                                type="text"
                                className={styles.inp}
                                required={true}
                            />
                        </div>
                    </div>
                    <Schedule />
                </div>
            </div>
        </>
    )
}

export default NewBranch
