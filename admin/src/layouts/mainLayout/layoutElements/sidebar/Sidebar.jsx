import styles from './Sidebar.module.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import top from '../../../../assets/img/arrowUp.png'
import bottom from '../../../../assets/img/downSide.png'
import branch from '../../../../assets/img/pages/branch.svg'
const Sidebar = () => {
    const [hovered, setHover] = useState(false)
    const [tagSec, setTagSec] = useState(false)
    const [storeSec, setStoreSec] = useState(false)
    const [catalogsSec, setCatalogsSec] = useState(false)

    const location = useLocation()

    const handleClose = () => {
        if (location.pathname.split('/')[1] === 'store') {
            setTagSec(false)
        } else if (location.pathname.split('/')[1] === 'tags') {
            setStoreSec(false)
        } else {
            setTagSec(false)
            setStoreSec(false)
        }

        setHover(false)
    }
    return (
        <>
            <div className={hovered ? 'w-22 mr-[88px]' : 'hidden'} />
            <div
                className={
                    hovered
                        ? styles.main + ' absolute bg-white h-full w-[250px] '
                        : styles.main
                }
                onMouseOver={() => setHover(true)}
                onMouseLeave={handleClose}
            >
                <NavLink
                    to={'/'}
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    <div className={styles.dashboard}>
                        <div className={styles.pageCont}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill={'#8895AE'}
                            >
                                <path fill="none" d="M0 0h24v24H0V0z" />
                                <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" />
                            </svg>
                        </div>
                        <h1
                            className={
                                hovered
                                    ? 'ml-5 transition-all ease-in-out ' +
                                      styles.hoverNav
                                    : 'hidden transition-all ease-in-out'
                            }
                        >
                            Dashboard
                        </h1>
                    </div>
                </NavLink>
                <NavLink
                    to={'/orders'}
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    <div className={styles.navigate}>
                        <div className={styles.pageCont}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 20 19"
                                fill="#8895AE"
                            >
                                <path d="M19.09 6.686h-4.354L10.755.402C10.582.134 10.29 0 10 0c-.29 0-.582.134-.755.412L5.264 6.686H.909c-.5 0-.909.432-.909.958 0 .087.01.173.036.26l2.31 8.88c.209.804.909 1.398 1.745 1.398h11.818c.836 0 1.536-.594 1.755-1.399l2.309-8.88.027-.259c0-.526-.41-.958-.91-.958zM10 2.663l2.545 4.023h-5.09L10 2.663zm5.91 13.603l-11.81.01-2-7.674h15.81l-2 7.664zM10 10.518c-1 0-1.818.862-1.818 1.916 0 1.054.818 1.916 1.818 1.916s1.818-.862 1.818-1.916c0-1.054-.818-1.916-1.818-1.916z" />
                            </svg>
                        </div>
                        <h1
                            className={
                                hovered
                                    ? 'ml-5 transition-all ease-in-out ' +
                                      styles.hoverNav
                                    : 'hidden transition-all ease-in-out'
                            }
                        >
                            Orders
                        </h1>
                    </div>
                </NavLink>
                <div
                    className={'cursor-pointer'}
                    onClick={() =>
                        tagSec ? setTagSec(false) : setTagSec(true)
                    }
                >
                    <div className={styles.navigate + ' relative'}>
                        <div className={'flex items-center justify-between'}>
                            <div className={'flex items-center'}>
                                <div className={styles.pageCont}>
                                    <svg
                                        className={styles.tag}
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.07689 2.41025C8.35894 2.20513 7.23074 2 6.41023 2C5.58973 2 4.46153 2.20513 3.74358 2.41025C3.02564 2.51282 2.51282 3.02564 2.41025 3.74358C2.20513 4.46153 2 5.58973 2 6.41023C2 7.23074 2.20513 8.35894 2.30769 9.07689C2.41025 9.79483 3.02564 10.3076 3.64102 10.4102C4.35896 10.5128 5.48716 10.7179 6.30767 10.7179C7.12818 10.7179 8.25638 10.5128 8.97432 10.4102C9.69227 10.3076 10.2051 9.69227 10.3077 9.07689C10.4102 8.35894 10.6153 7.23074 10.6153 6.41023C10.6153 5.58973 10.4102 4.46153 10.3077 3.74358C10.3077 3.02564 9.79483 2.51282 9.07689 2.41025Z"
                                            fill="#8895AE"
                                        />
                                        <path
                                            d="M9.07684 13.6923C8.35889 13.5897 7.23069 13.3846 6.41018 13.3846C5.58968 13.3846 4.46148 13.5897 3.74353 13.6923C3.02559 13.7949 2.51277 14.4102 2.4102 15.0256C2.30764 15.7436 2.10251 16.8718 2.10251 17.6923C2.10251 18.5128 2.30764 19.641 2.4102 20.3589C2.51277 21.0769 3.12815 21.5897 3.74353 21.6923C4.46148 21.7948 5.58968 22 6.41018 22C7.23069 22 8.35889 21.7948 9.07684 21.6923C9.79478 21.5897 10.3076 20.9743 10.4102 20.3589C10.5127 19.641 10.7179 18.5128 10.7179 17.6923C10.7179 16.8718 10.5127 15.7436 10.4102 15.0256C10.3076 14.3077 9.79478 13.7949 9.07684 13.6923Z"
                                            fill="#8895AE"
                                        />
                                        <path
                                            d="M15.0255 10.4104C15.7435 10.513 16.8717 10.7181 17.6922 10.7181C18.5127 10.7181 19.6409 10.513 20.3588 10.4104C21.0768 10.3078 21.5896 9.69246 21.6921 9.07708C21.7947 8.35914 21.9998 7.23094 21.9998 6.41043C21.9998 5.58992 21.7947 4.46172 21.6921 3.74377C21.5896 3.02583 20.9742 2.51301 20.3588 2.41045C19.6409 2.30788 18.5127 2.10276 17.6922 2.10276C16.8717 2.10276 15.7435 2.30788 15.0255 2.41045C14.3076 2.51301 13.7947 3.12839 13.6922 3.74377C13.5896 4.46172 13.3845 5.58992 13.3845 6.41043C13.3845 7.23094 13.5896 8.35914 13.6922 9.07708C13.7947 9.79503 14.3076 10.3078 15.0255 10.4104Z"
                                            fill="#8895AE"
                                        />
                                        <path
                                            d="M20.3588 13.6923C19.6409 13.5897 18.5127 13.3846 17.6922 13.3846C16.8717 13.3846 15.7435 13.5897 15.0255 13.6923C14.3076 13.7949 13.7947 14.4102 13.6922 15.0256C13.5896 15.7436 13.3845 16.8718 13.3845 17.6923C13.3845 18.5128 13.5896 19.641 13.6922 20.3589C13.7947 21.0769 14.4101 21.5897 15.0255 21.6923C15.7435 21.7948 16.8717 22 17.6922 22C18.5127 22 19.6409 21.7948 20.3588 21.6923C21.0768 21.5897 21.5896 20.9743 21.6921 20.3589C21.7947 19.641 21.9998 18.5128 21.9998 17.6923C21.9998 16.8718 21.7947 15.7436 21.6921 15.0256C21.5896 14.3077 21.0768 13.7949 20.3588 13.6923Z"
                                            fill="#8895AE"
                                        />
                                    </svg>
                                </div>
                                <h1
                                    className={
                                        hovered
                                            ? 'ml-5 transition-all ease-in-out ' +
                                              styles.hoverNav
                                            : 'hidden transition-all ease-in-out'
                                    }
                                >
                                    Tags
                                </h1>
                            </div>
                            <div
                                className={
                                    hovered ? 'absolute right-5' : 'hidden'
                                }
                            >
                                {tagSec ? (
                                    <img
                                        src={bottom}
                                        alt=""
                                        width={24}
                                        height={24}
                                    />
                                ) : (
                                    <img
                                        src={top}
                                        alt=""
                                        width={24}
                                        height={24}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={
                            hovered
                                ? tagSec
                                    ? styles.submenu +
                                      ' w-full   flex  flex-col py-3 '
                                    : 'hidden'
                                : 'hidden'
                        }
                        style={{ borderBottom: '1px solid #ecf0f7' }}
                    >
                        <NavLink
                            to={'/tags/restaurants/list'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-24 py-3 bg-primary text-white font-bold '
                                    : 'px-24 py-3 hover:bg-primary hover:text-white hover:font-bold transition-all ease-in-out'
                            }
                        >
                            Restaurants
                        </NavLink>
                        <NavLink
                            to={'/tags/grocery/list'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-24 py-3 bg-primary text-white font-bold '
                                    : 'px-24 py-3 hover:bg-primary hover:text-white hover:font-bold transition-all ease-in-out'
                            }
                        >
                            Grocery
                        </NavLink>
                        <NavLink
                            to={'/tags/pastries/list'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-24 py-3 bg-primary text-white font-bold '
                                    : 'px-24 py-3 hover:bg-primary hover:text-white hover:font-bold transition-all ease-in-out'
                            }
                        >
                            Pastries
                        </NavLink>
                    </div>
                </div>

                <div
                    className={'cursor-pointer'}
                    onClick={() =>
                        storeSec ? setStoreSec(false) : setStoreSec(true)
                    }
                >
                    <div className={styles.navigate}>
                        <div className={'flex items-center justify-between'}>
                            <div className={'flex items-center'}>
                                <div className={styles.pageCont}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 64 64"
                                    >
                                        <path
                                            fill="#8895AE"
                                            d="M32 20.1H7.162a1.5 1.5 0 0 1-1.3-2.245L11.833 7.4a1.5 1.5 0 0 1 1.3-.755H32a1.5 1.5 0 0 1 0 3H14.006L9.747 17.1H32a1.5 1.5 0 0 1 0 3Z"
                                        />
                                        <path
                                            fill="#8895AE"
                                            d="M56.838 20.1H32a1.5 1.5 0 0 1 0-3h22.253l-4.259-7.455H32a1.5 1.5 0 0 1 0-3h18.864a1.5 1.5 0 0 1 1.3.755l5.976 10.454a1.5 1.5 0 0 1-1.3 2.245zM13.372 31.267a7.719 7.719 0 0 1-7.71-7.71V18.6a1.5 1.5 0 0 1 3 0v4.958a4.71 4.71 0 1 0 9.419 0V18.6a1.5 1.5 0 0 1 3 0v4.958a7.718 7.718 0 0 1-7.709 7.709z"
                                        />
                                        <path
                                            fill="#8895AE"
                                            d="M25.791 31.267a7.719 7.719 0 0 1-7.71-7.71V18.6a1.5 1.5 0 0 1 3 0v4.958a4.71 4.71 0 1 0 9.419 0V18.6a1.5 1.5 0 0 1 3 0v4.958a7.718 7.718 0 0 1-7.709 7.709Z"
                                        />
                                        <path
                                            fill="#8895AE"
                                            d="M38.209 31.267a7.718 7.718 0 0 1-7.709-7.71V18.6a1.5 1.5 0 0 1 3 0v4.958a4.71 4.71 0 1 0 9.419 0V18.6a1.5 1.5 0 0 1 3 0v4.958a7.719 7.719 0 0 1-7.71 7.709Z"
                                        />
                                        <path
                                            fill="#8895AE"
                                            d="M50.628 31.267a7.718 7.718 0 0 1-7.709-7.71V18.6a1.5 1.5 0 0 1 3 0v4.958a4.71 4.71 0 1 0 9.419 0V18.6a1.5 1.5 0 1 1 3 0v4.958a7.719 7.719 0 0 1-7.71 7.709Z"
                                        />
                                        <path
                                            fill="#8895AE"
                                            d="M44.418 20.1a1.5 1.5 0 0 1-1.436-1.068L39.838 8.577a1.5 1.5 0 0 1 2.873-.865l3.144 10.455a1.5 1.5 0 0 1-1 1.868 1.475 1.475 0 0 1-.437.065zm-24.836 0a1.475 1.475 0 0 1-.433-.064 1.5 1.5 0 0 1-1-1.868l3.14-10.456a1.5 1.5 0 0 1 2.873.865l-3.144 10.454a1.5 1.5 0 0 1-1.436 1.069zM32 20.1a1.5 1.5 0 0 1-1.5-1.5V8.145a1.5 1.5 0 1 1 3 0V18.6a1.5 1.5 0 0 1-1.5 1.5zm0 37.255H9.684a1.5 1.5 0 0 1-1.5-1.5v-27.31a1.5 1.5 0 0 1 3 0v25.81H32a1.5 1.5 0 0 1 0 3z"
                                        />
                                        <path
                                            fill="#8895AE"
                                            d="M54.316 57.355H32a1.5 1.5 0 1 1 0-3h20.816v-25.81a1.5 1.5 0 0 1 3 0v27.31a1.5 1.5 0 0 1-1.5 1.5Z"
                                        />
                                        <path
                                            fill="#8895AE"
                                            d="M43.881 56.98a1.5 1.5 0 0 1-1.5-1.5V39.615H21.619v15.757a1.5 1.5 0 0 1-3 0V38.115a1.5 1.5 0 0 1 1.5-1.5h23.762a1.5 1.5 0 0 1 1.5 1.5V55.48a1.5 1.5 0 0 1-1.5 1.5Z"
                                        />
                                    </svg>
                                </div>
                                <h1
                                    className={
                                        hovered
                                            ? 'ml-5 transition-all ease-in-out ' +
                                              styles.hoverNav
                                            : 'hidden transition-all ease-in-out'
                                    }
                                >
                                    Store
                                </h1>
                            </div>
                            <div
                                className={
                                    hovered ? 'absolute right-5' : 'hidden'
                                }
                            >
                                {storeSec ? (
                                    <img
                                        src={bottom}
                                        alt=""
                                        width={24}
                                        height={24}
                                    />
                                ) : (
                                    <img
                                        src={top}
                                        alt=""
                                        width={24}
                                        height={24}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={
                            hovered
                                ? storeSec
                                    ? styles.submenu +
                                      ' w-full   flex  flex-col py-3 '
                                    : 'hidden'
                                : 'hidden'
                        }
                        style={{ borderBottom: '1px solid #ecf0f7' }}
                    >
                        <NavLink
                            to={'/store/restaurants/list'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-24 py-3 bg-primary text-white font-bold '
                                    : 'px-24 py-3 hover:bg-primary hover:text-white hover:font-bold transition-all ease-in-out'
                            }
                        >
                            Restaurants
                        </NavLink>
                        <NavLink
                            to={'/store/grocery/list'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-24 py-3 bg-primary text-white font-bold '
                                    : 'px-24 py-3 hover:bg-primary hover:text-white hover:font-bold transition-all ease-in-out'
                            }
                        >
                            Grocery
                        </NavLink>
                        <NavLink
                            to={'/store/pastries/list'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-24 py-3 bg-primary text-white font-bold '
                                    : 'px-24 py-3 hover:bg-primary hover:text-white hover:font-bold transition-all ease-in-out'
                            }
                        >
                            Pastries
                        </NavLink>
                    </div>
                </div>
                <NavLink
                    to={'/branches/list'}
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    <div className={styles.navigate}>
                        <div className={styles.pageCont}>
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                viewBox="0 0 1000 1000"
                                fill={'#8895AE'}
                            >
                                <g>
                                    <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                                        <path d="M4637.6,4677.7c-367.8-47.9-674.3-139.8-1005.7-306.5c-304.6-151.3-549.8-327.6-795-572.8c-438.7-440.6-724.1-977-844.8-1593.8c-67-333.3-63.2-752.9,7.7-1055.5c220.3-931,936.8-2386.9,2068.9-4208.7c335.2-540.2,913.8-1417.6,932.9-1417.6s597.7,879.3,932.9,1417.6C7193.1-1034.8,7919.1,497.7,8049.4,1401.9c44.1,314.2-13.4,816.1-137.9,1195.4c-82.4,247.1-262.5,603.4-415.7,818c-164.8,231.8-480.8,547.9-712.6,712.6c-323.8,229.9-768.2,427.2-1134.1,501.9C5321.5,4696.9,4930.7,4716,4637.6,4677.7z M5470.9,4037.9c737.5-155.2,1362-643.7,1710.7-1341c180.1-362.1,260.5-708.8,260.5-1130.2c0-247.1-7.7-316.1-49.8-488.5c-233.7-934.8-980.8-2425.3-2132.1-4252.8c-134.1-210.7-249.1-383.1-258.6-383.1s-126.4,174.3-260.5,387C3616.5-1387.3,2875.2,78.2,2631.9,995.8c-67.1,249-70.9,281.6-70.9,561.3c0,327.6,28.7,515.3,122.6,802.7c241.4,741.4,837.2,1354.4,1551.7,1597.7c126.4,44.1,335.2,92,507.7,116.9C4863.6,4091.5,5323.4,4068.5,5470.9,4037.9z" />
                                        <path d="M4733.4,2829.1c-448.3-95.8-835.2-486.6-929.1-936.8c-182-869.7,586.2-1637.9,1455.9-1455.9c455.9,95.8,842.9,482.8,938.7,938.7C6380.8,2248.7,5606.9,3016.8,4733.4,2829.1z M5260.2,2187.4c120.7-57.5,235.6-172.4,296.9-295c38.3-78.5,47.9-124.5,47.9-258.6c0-149.4-5.7-172.4-65.1-283.5c-72.8-134.1-134.1-193.5-277.8-268.2c-82.4-42.1-122.6-49.8-260.5-49.8c-137.9,0-178.1,7.7-260.5,49.8c-143.7,76.6-205,134.1-277.8,268.2c-57.5,107.3-63.2,137.9-65.1,273.9c0,164.8,21.1,237.5,109.2,367.8C4662.5,2221.8,5001.5,2310,5260.2,2187.4z" />
                                        <path d="M1695.1,3434.5C858,3216.1,233.5,2461.3,114.7,1526.4C72.5,1187.4,118.5,879,287.1,384.7C543.8-372,1206.6-1668.9,1999.7-2960l191.6-312.2l76.6,120.7c109.2,174.3,519.2,858.2,555.5,925.3c28.7,57.5,26.8,61.3-107.3,302.7c-74.7,134.1-139.8,243.3-145.6,243.3c-5.8-1.9-92-147.5-191.6-327.6c-145.6-260.5-185.8-319.9-205-300.8c-47.9,49.8-459.8,808.4-712.6,1318C1084-236,867.5,287,756.4,723.8c-157.1,603.4,13.4,1266.3,436.8,1706.9c63.2,65.1,147.5,141.8,187.7,170.5c59.4,40.2,84.3,80.5,134.1,206.9c80.5,201.1,136,312.3,251,498.1c51.7,82.4,93.9,153.3,93.9,159C1859.9,3476.6,1842.6,3474.7,1695.1,3434.5z" />
                                        <path d="M8143.2,3465.1c0-5.8,42.1-76.6,93.9-159c114.9-185.8,170.5-296.9,250.9-498.1c49.8-126.4,74.7-166.7,134.1-206.9c195.4-134.1,431-444.4,538.3-705c103.4-249,139.8-434.9,139.8-722.2c-1.9-229.9-7.7-283.5-63.2-486.6c-63.2-235.6-216.5-651.3-377.4-1017.2c-205-469.3-946.3-1892.7-1030.6-1978.9c-19.2-19.2-57.5,38.3-205,300.8c-99.6,180.1-183.9,325.7-189.7,327.6c-5.7,0-72.8-109.2-147.5-243.3c-134.1-241.4-136-245.2-105.4-302.7c36.4-70.9,448.3-760.5,553.6-925.3l76.6-120.7l191.6,312.2C8963.1-1395,9641.3-9.9,9840.5,800.4c116.9,480.8,61.3,988.5-164.7,1459.7c-128.4,268.2-258.6,450.2-465.5,651.3c-256.7,247.1-503.8,400.4-798.8,492.3C8262,3449.8,8143.2,3476.6,8143.2,3465.1z" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <h1
                            className={
                                hovered
                                    ? 'ml-5 transition-all ease-in-out ' +
                                      styles.hoverNav
                                    : 'hidden transition-all ease-in-out'
                            }
                        >
                            Branches
                        </h1>
                    </div>
                </NavLink>
                <div
                    className={'cursor-pointer'}
                    onClick={() =>
                        catalogsSec
                            ? setCatalogsSec(false)
                            : setCatalogsSec(true)
                    }
                >
                    <div className={styles.navigate}>
                        <div className={'flex items-center justify-between'}>
                            <div className={'flex items-center'}>
                                <div className={styles.pageCont}>
                                    <svg
                                        fill={'#8895AE'}
                                        version="1.1"
                                        viewBox="0 0 700 700"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g>
                                            <path d="m275.33 522.67c0 20.535-16.801 37.332-37.332 37.332h-130.67c-20.535 0-37.332-16.801-37.332-37.332v-130.67c0-20.535 16.801-37.332 37.332-37.332h130.67c20.535 0 37.332 16.801 37.332 37.332z" />
                                            <path d="m630 429.33h-298.67c-11.199 0-18.668-7.4648-18.668-18.668v-18.668c0-11.199 7.4648-18.668 18.668-18.668h298.67z" />
                                            <path d="m555.33 522.67h-224c-11.199 0-18.668-7.4648-18.668-18.668v-18.668c0-11.199 7.4648-18.668 18.668-18.668h224z" />
                                            <path d="m275.33 242.67c0 20.535-16.801 37.332-37.332 37.332h-130.67c-20.535 0-37.332-16.801-37.332-37.332v-130.67c0-20.535 16.801-37.332 37.332-37.332h130.67c20.535 0 37.332 16.801 37.332 37.332z" />
                                            <path d="m630 149.33h-298.67c-11.199 0-18.668-7.4648-18.668-18.668l0.003907-18.664c0-11.199 7.4648-18.668 18.668-18.668h298.67z" />
                                            <path d="m555.33 242.67h-224c-11.199 0-18.668-7.4648-18.668-18.668v-18.668c0-11.199 7.4648-18.668 18.668-18.668h224z" />
                                        </g>
                                    </svg>
                                </div>
                                <h1
                                    className={
                                        hovered
                                            ? 'ml-5 transition-all ease-in-out ' +
                                              styles.hoverNav
                                            : 'hidden transition-all ease-in-out'
                                    }
                                >
                                    Catalogs
                                </h1>
                            </div>
                            <div
                                className={
                                    hovered ? 'absolute right-5' : 'hidden'
                                }
                            >
                                {catalogsSec ? (
                                    <img
                                        src={bottom}
                                        alt=""
                                        width={24}
                                        height={24}
                                    />
                                ) : (
                                    <img
                                        src={top}
                                        alt=""
                                        width={24}
                                        height={24}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={
                            hovered
                                ? catalogsSec
                                    ? styles.submenu +
                                      ' w-full   flex  flex-col py-3 '
                                    : 'hidden'
                                : 'hidden'
                        }
                        style={{ borderBottom: '1px solid #ecf0f7' }}
                    >
                        <NavLink
                            to={'/catalogs/restaurants/list'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-24 py-3 bg-primary text-white font-bold '
                                    : 'px-24 py-3 hover:bg-primary hover:text-white hover:font-bold transition-all ease-in-out'
                            }
                        >
                            Restaurants
                        </NavLink>
                        <NavLink
                            to={'/catalogs/grocery/list'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-24 py-3 bg-primary text-white font-bold '
                                    : 'px-24 py-3 hover:bg-primary hover:text-white hover:font-bold transition-all ease-in-out'
                            }
                        >
                            Grocery
                        </NavLink>
                        <NavLink
                            to={'/catalogs/pastries/list'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-24 py-3 bg-primary text-white font-bold '
                                    : 'px-24 py-3 hover:bg-primary hover:text-white hover:font-bold transition-all ease-in-out'
                            }
                        >
                            Pastries
                        </NavLink>
                    </div>
                </div>
                <NavLink
                    to={'/users/list'}
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    <div className={styles.navigate}>
                        <div className={styles.pageCont}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={'#8895AE'}
                            >
                                <path d="M12.3,12.22A4.92,4.92,0,0,0,14,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,1,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,12.3,12.22ZM9,11.5a3,3,0,1,1,3-3A3,3,0,0,1,9,11.5Zm9.74.32A5,5,0,0,0,15,3.5a1,1,0,0,0,0,2,3,3,0,0,1,3,3,3,3,0,0,1-1.5,2.59,1,1,0,0,0-.5.84,1,1,0,0,0,.45.86l.39.26.13.07a7,7,0,0,1,4,6.38,1,1,0,0,0,2,0A9,9,0,0,0,18.74,11.82Z" />
                            </svg>
                        </div>
                        <h1
                            className={
                                hovered
                                    ? 'ml-5 transition-all ease-in-out ' +
                                      styles.hoverNav
                                    : 'hidden transition-all ease-in-out'
                            }
                        >
                            Users
                        </h1>
                    </div>
                </NavLink>
                <NavLink
                    to={'/settings'}
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    <div className={styles.navigate}>
                        <div className={styles.pageCont}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={'#8895AE'}
                                viewBox="0 0 24 24"
                            >
                                <path fill="none" d="M0 0h24v24H0V0z" />
                                <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                            </svg>
                        </div>
                        <h1
                            className={
                                hovered
                                    ? 'ml-5 transition-all ease-in-out ' +
                                      styles.hoverNav
                                    : 'hidden transition-all ease-in-out'
                            }
                        >
                            Settings
                        </h1>
                    </div>
                </NavLink>
            </div>
        </>
    )
}

export default Sidebar
