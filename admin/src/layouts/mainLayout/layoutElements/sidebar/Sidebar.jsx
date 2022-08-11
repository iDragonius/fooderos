import styles from './Sidebar.module.scss'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
    return (
        <div className={styles.main}>
            <NavLink
                to={'/dashboard'}
                className={({ isActive }) => (isActive ? styles.active : '')}
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
                </div>
            </NavLink>
            <NavLink
                to={'/orders'}
                className={({ isActive }) => (isActive ? styles.active : '')}
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
                </div>
            </NavLink>
            <NavLink
                to={'/tags/list'}
                className={({ isActive }) => (isActive ? styles.active : '')}
            >
                <div className={styles.navigate}>
                    <div className={styles.pageCont}>
                        <svg
                            className={styles.tag}
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="#8895AE"
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
                </div>
            </NavLink>
        </div>
    )
}

export default Sidebar