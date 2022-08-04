import styles from '../../LoginModal.module.scss'
import googleLogo from '../../../../../../assets/img/google.svg'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const Google = ({ setSc, setStep }) => {
    const handeLogin = async (res) => {
        const data = res
        await axios
            .get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${res.access_token}`
            )
            .then((res) => {
                if (res.status === 200) {
                    setSc(true)
                    setStep(true)
                    sessionStorage.setItem('sessionToken', data.access_token)
                    sessionStorage.setItem('name', res.data.name)
                }
            })
    }
    const handleErr = (err) => {
        console.log(err)
    }

    const login = useGoogleLogin({
        onSuccess: handeLogin,
        onError: handleErr,
    })
    return (
        <div className={styles.socialNetwork} onClick={() => login()}>
            <button>
                <img src={googleLogo} alt="google" />
            </button>
        </div>
    )
}

export default Google
