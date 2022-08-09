import styles from './Header.module.scss'
import arrow from '../../../assets/img/pages/arrow.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkData, setData } from '../../../store/slices/languageSlice'
const Header = ({ section, desc, tag, type }) => {
    const navigate = useNavigate()
    const changePage = (e) => {
        e.preventDefault()
        navigate('/tags/new')
    }
    const back = (e) => {
        e.preventDefault()
        navigate('/tags/list')
    }
    const dispatch = useDispatch()
    const handleData = (e) => {
        e.preventDefault()
        dispatch(setData({ desc, tag, type }))
        dispatch(checkData())
    }
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                {section === 'NewTag' ? (
                    <div className={styles.name} onClick={back}>
                        <h1 className={styles.section}>
                            <img src={arrow} alt="" />
                        </h1>
                        <h1 className={styles.section}> New Tag</h1>
                    </div>
                ) : (
                    <div className={styles.name}>
                        <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="#fff"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.07689 2.41025C8.35894 2.20513 7.23074 2 6.41023 2C5.58973 2 4.46153 2.20513 3.74358 2.41025C3.02564 2.51282 2.51282 3.02564 2.41025 3.74358C2.20513 4.46153 2 5.58973 2 6.41023C2 7.23074 2.20513 8.35894 2.30769 9.07689C2.41025 9.79483 3.02564 10.3076 3.64102 10.4102C4.35896 10.5128 5.48716 10.7179 6.30767 10.7179C7.12818 10.7179 8.25638 10.5128 8.97432 10.4102C9.69227 10.3076 10.2051 9.69227 10.3077 9.07689C10.4102 8.35894 10.6153 7.23074 10.6153 6.41023C10.6153 5.58973 10.4102 4.46153 10.3077 3.74358C10.3077 3.02564 9.79483 2.51282 9.07689 2.41025Z"
                                fill="#fff"
                            />
                            <path
                                d="M9.07684 13.6923C8.35889 13.5897 7.23069 13.3846 6.41018 13.3846C5.58968 13.3846 4.46148 13.5897 3.74353 13.6923C3.02559 13.7949 2.51277 14.4102 2.4102 15.0256C2.30764 15.7436 2.10251 16.8718 2.10251 17.6923C2.10251 18.5128 2.30764 19.641 2.4102 20.3589C2.51277 21.0769 3.12815 21.5897 3.74353 21.6923C4.46148 21.7948 5.58968 22 6.41018 22C7.23069 22 8.35889 21.7948 9.07684 21.6923C9.79478 21.5897 10.3076 20.9743 10.4102 20.3589C10.5127 19.641 10.7179 18.5128 10.7179 17.6923C10.7179 16.8718 10.5127 15.7436 10.4102 15.0256C10.3076 14.3077 9.79478 13.7949 9.07684 13.6923Z"
                                fill="#fff"
                            />
                            <path
                                d="M15.0255 10.4104C15.7435 10.513 16.8717 10.7181 17.6922 10.7181C18.5127 10.7181 19.6409 10.513 20.3588 10.4104C21.0768 10.3078 21.5896 9.69246 21.6921 9.07708C21.7947 8.35914 21.9998 7.23094 21.9998 6.41043C21.9998 5.58992 21.7947 4.46172 21.6921 3.74377C21.5896 3.02583 20.9742 2.51301 20.3588 2.41045C19.6409 2.30788 18.5127 2.10276 17.6922 2.10276C16.8717 2.10276 15.7435 2.30788 15.0255 2.41045C14.3076 2.51301 13.7947 3.12839 13.6922 3.74377C13.5896 4.46172 13.3845 5.58992 13.3845 6.41043C13.3845 7.23094 13.5896 8.35914 13.6922 9.07708C13.7947 9.79503 14.3076 10.3078 15.0255 10.4104Z"
                                fill="#fff"
                            />
                            <path
                                d="M20.3588 13.6923C19.6409 13.5897 18.5127 13.3846 17.6922 13.3846C16.8717 13.3846 15.7435 13.5897 15.0255 13.6923C14.3076 13.7949 13.7947 14.4102 13.6922 15.0256C13.5896 15.7436 13.3845 16.8718 13.3845 17.6923C13.3845 18.5128 13.5896 19.641 13.6922 20.3589C13.7947 21.0769 14.4101 21.5897 15.0255 21.6923C15.7435 21.7948 16.8717 22 17.6922 22C18.5127 22 19.6409 21.7948 20.3588 21.6923C21.0768 21.5897 21.5896 20.9743 21.6921 20.3589C21.7947 19.641 21.9998 18.5128 21.9998 17.6923C21.9998 16.8718 21.7947 15.7436 21.6921 15.0256C21.5896 14.3077 21.0768 13.7949 20.3588 13.6923Z"
                                fill="#fff"
                            />
                        </svg>
                        <h1 className={styles.section}>Tag List</h1>
                    </div>
                )}

                <div className={styles.btns}>
                    {section === 'NewTag' ? (
                        <button
                            className={styles.tagType + ' ' + styles.btn}
                            onClick={handleData}
                        >
                            Save
                        </button>
                    ) : (
                        <>
                            <button
                                className={styles.tagType + ' ' + styles.btn}
                            >
                                <span>+</span>
                                New Tag Type
                            </button>
                            <button
                                className={styles.tag + ' ' + styles.btn}
                                onClick={changePage}
                            >
                                <span>+</span>
                                New Tag
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
