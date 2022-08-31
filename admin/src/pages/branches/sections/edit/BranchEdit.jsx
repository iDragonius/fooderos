import React, { useEffect, useState } from 'react'
import BranchEditLanguages from '../../languages/branchEditLanguages/BranchEditLanguages'
import BranchEditHeader from '../../headers/branchEditHeader/BranchEditHeader'
import LocationMap from '../new/locationMap/LocationMap'
import styles from '../new/NewBranch.module.scss'
import BannerUpload from '../new/bannerUpload/BannerUpload'
import ImgUpload from '../new/imgUpload/ImgUpload'
import Select from 'react-select'
import pin from '../../../../assets/img/pin.png'
import Schedule from './schedule/Schedule'
import {
    useCitiesQuery,
    useCountriesQuery,
    usePaymentQuery,
    useShowBranchQuery,
} from '../../../../store/slices/api/branchApiSlice'
import { useSelector } from 'react-redux'
import {
    allCurrencies,
    allPaymentMethods,
    changed,
    currBranch,
    currBranchSchedule,
} from '../../../../store/slices/branchListSlice'
import { useLocation } from 'react-router-dom'

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

const BranchEdit = () => {
    const [schedule, setSchedule] = useState({
        Monday: {
            start: '09:00',
            end: '23:00',
            closed: false,
        },
        Tuesday: {
            start: '09:00',
            end: '23:00',
            closed: false,
        },
        Wednesday: {
            start: '09:00',
            end: '23:00',
            closed: false,
        },
        Thursday: {
            start: '09:00',
            end: '23:00',
            closed: false,
        },
        Friday: {
            start: '09:00',
            end: '23:00',
            closed: false,
        },
        Saturday: {
            start: '09:00',
            end: '23:00',
            closed: false,
        },
        Sunday: {
            start: '09:00',
            end: '23:00',
            closed: false,
        },
    })
    const [currentLoc, setCurrentLoc] = useState({
        lat: 40.409264,
        lng: 49.867092,
    })
    const { data: countries, isSuccess } = useCountriesQuery()
    const [allCountries, setAllCountries] = useState([])
    const [allCities, setAllCities] = useState([])
    const [allCurr, setAllCurr] = useState([])
    const [allPayment, setAllPayment] = useState([])
    const [maxDistance, setMaxDistance] = useState(false)
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState([])
    const [banner, setBanner] = useState([])
    const [defaultVal, setDefaultVal] = useState([])
    const [currentCountry, setCurrentCountry] = useState({
        label: 'Azerbaijan',
        value: 'Azerbaijan',
    })
    const [currentCity, setCurrentCity] = useState('')
    const { data: paymentMet } = usePaymentQuery()
    const currencies = useSelector(allCurrencies)
    const paymentMethods = useSelector(allPaymentMethods)
    const countryChanged = useSelector(changed)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [currency, setCurrency] = useState()
    const [payment, setPayment] = useState()
    const [locate, setLocate] = useState()
    const [cashLimit, setCashLimit] = useState()
    const [amount, setAmount] = useState()
    const [payload, setPayload] = useState()
    const [maxDist, setMaxDist] = useState()
    const location = useLocation()
    const [country, setCountry] = useState('Azerbaijan')

    const currentBranch = useSelector(currBranch)

    const currentBranchSchedule = useSelector(currBranchSchedule)
    const { data: cities, isSuccess: success } = useCitiesQuery(
        currentCountry.value
    )
    const { data: branch } = useShowBranchQuery(location.pathname.split('/')[3])
    useEffect(() => {
        setPayment(currentBranch.payment)
        setCurrency(currentBranch.currency)
        // setCurrentCountry(currentBranch.country)
        setCurrentCity(currentBranch.city)
        setPayload(currentBranch.paylaod)
        setPhone(currentBranch.phone)
        setCashLimit(currentBranch.cash_limit)
        setAmount(currentBranch.amount)
        setMaxDist(currentBranch.maxDistance)
        setMaxDistance(true)
        console.log(currentBranch.coordinates)
        setSchedule(currentBranchSchedule)
        console.log(currentBranchSchedule)
        // setCountry(currentBranch.country.value)
        // setCurrentLoc(currentBranch.coordinates)
    }, [currentBranch])
    useEffect(() => {
        if (isSuccess) {
            setAllCountries([])
            for (let i = 0; i < countries.length; i++) {
                if (countries[i].name === 'Azerbaijan') {
                    setDefaultVal(i)
                }
                setAllCountries((old) => [
                    ...old,
                    {
                        value: countries[i].name,
                        label: countries[i].emoji + ' ' + countries[i].name,
                    },
                ])
            }
        }
    }, [isSuccess])
    useEffect(() => {
        setAllPayment([])
        paymentMethods.map((method) => {
            setAllPayment((old) => [
                ...old,
                {
                    value: method,
                    label: method,
                },
            ])
        })
    }, [paymentMethods])
    useEffect(() => {
        setAllCurr([])
        currencies.map((method) => {
            setAllCurr((old) => [
                ...old,
                {
                    value: method,
                    label: method,
                },
            ])
        })
    }, [currencies])
    useEffect(() => {
        setAllCities([])
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
    }, [countryChanged])
    const changeCountry = (data) => {
        setCurrentCountry(data.value)
    }

    return (
        <>
            <LocationMap
                setOpen={setOpen}
                open={open}
                currentLoc={currentLoc}
                setCurrentLoc={setCurrentLoc}
            />
            <BranchEditHeader />
            <BranchEditLanguages />
            <div className={styles.main}>
                <BannerUpload
                    file={banner}
                    setFile={setBanner}
                    path={currentBranch.banner}
                />
                <div className={'flex mt-8 flex-wrap mb-32'}>
                    <ImgUpload
                        setFile={setFile}
                        file={file}
                        path={currentBranch.profile}
                    />
                    <div className={'ml-8'}>
                        <div>
                            <div className={styles.phoneOpt}>
                                <input
                                    type="text"
                                    className={styles.inp}
                                    required={true}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
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
                            value={currentCountry}
                            className={'w-[528px] mt-4'}
                            defaultValue={{
                                label: '🇦🇿 Azerbaijan',
                                value: 'Azerbaijan',
                            }}
                        />
                        <Select
                            placeholder={'City'}
                            className={'w-[528px] mt-4'}
                            styles={customStyles}
                            options={allCities}
                            value={currentCity}
                            onChange={(data) => setCurrentCity(data.value)}
                        />
                        <div className={styles.form + ' mt-4'}>
                            <div className={styles.phone}>
                                <input
                                    type="text"
                                    className={styles.inp}
                                    required={true}
                                    value={locate}
                                    onChange={(e) => setLocate(e.target.value)}
                                />
                                <label
                                    htmlFor={'login'}
                                    className={styles.phoneL}
                                >
                                    Location
                                </label>
                            </div>
                            <div className={styles.cc + ' mr-0 cursor-pointer'}>
                                <div
                                    className={'flex '}
                                    onClick={() => {
                                        document.body.style.overflow = 'hidden'
                                        setOpen(true)
                                    }}
                                >
                                    <img
                                        className={'mr-2'}
                                        src={pin}
                                        alt="pin"
                                    />
                                    Choose
                                </div>
                            </div>
                        </div>
                        <div className={'flex mt-4'}>
                            <Select
                                isMulti={true}
                                placeholder={'Currency'}
                                styles={customStyles}
                                options={allCurr}
                                className={'w-[260px] mr-2'}
                                value={currency}
                                onChange={(data) => setCurrency(data)}
                            />
                            <Select
                                isMulti={true}
                                placeholder={'Payment Method'}
                                options={allPayment}
                                styles={customStyles}
                                className={'w-[260px]'}
                                value={payment}
                                onChange={(data) => setPayment(data)}
                            />
                        </div>
                        <div className={'flex mt-4'}>
                            <div>
                                <div className={styles.phoneXs + ' mr-2'}>
                                    <input
                                        type="text"
                                        className={styles.inp}
                                        required={true}
                                        value={cashLimit}
                                        onChange={(e) =>
                                            setCashLimit(e.target.value)
                                        }
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
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
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
                                    value={payload}
                                    onChange={(e) => setPayload(e.target.value)}
                                />
                                <label className={styles.phoneL}>
                                    Preorder reserve period
                                </label>
                            </div>
                        </div>
                        <div className={'flex mt-8'}>
                            <input
                                type="checkbox"
                                className={'mr-3'}
                                onChange={(e) =>
                                    setMaxDistance(e.target.checked)
                                }
                            />
                            <p>Maximum delivery distance</p>
                        </div>
                        <div
                            className={
                                maxDistance
                                    ? styles.phoneOpt + ' mt-4'
                                    : 'hidden'
                            }
                        >
                            <input
                                type="text"
                                className={styles.inp}
                                required={true}
                                value={maxDist}
                                onChange={(e) => setMaxDist(e.target.value)}
                            />
                        </div>
                    </div>
                    <Schedule schedule={schedule} setSchedule={setSchedule} />
                </div>
            </div>
        </>
    )
}

export default BranchEdit
