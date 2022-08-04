import styles from '../../LoginModal.module.scss'
import googleLogo from '../../../../../../assets/img/google.svg'
import { useGoogleLogin } from '@react-oauth/google'
import {useDispatch} from "react-redux";
import {setAuth, setCredentials} from "../../../../../../store/slices/authSlice";
import {useLoginScMutation} from "../../../../../../store/slices/api/authApiSlice";

const Google = ({ setSc, setStep, setOpen }) => {
    const dispatch = useDispatch()
    const [login] = useLoginScMutation()
    const handeLogin = async (res) => {
        await
            fetch(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${res.access_token}`
            )
                .then(res=> res.json())
                .then( async  (resData) => {
                    console.log(resData)
                dispatch(setCredentials({ name:resData.name,} ))

                    sessionStorage.setItem('email', resData.email)

                    await login({
                        name:resData.name ,
                        email:resData.email ,
                        social_providers:2
                    }).unwrap().then((data)=>{
                        console.log(res)
                        if(data.status==='0'){
                            setSc(true)
                            setStep(true)

                        }
                        if(data.status==='1'){
                            console.log(data.toke)
                            localStorage.setItem('token',data.toke)
                            dispatch(setCredentials({ token:data.toke}))
                            dispatch(setAuth(true))
                            setSc(false)

                            setStep(false)
                            setOpen(false)
                        }
                    }).catch(e=>{
                        console.log(e)
                    })



            })
    }
    const handleErr = (err) => {
        console.log(err)
    }

    const log = useGoogleLogin({
        onSuccess: handeLogin,
        onError: handleErr,
    })
    return (
        <div className={styles.socialNetwork} onClick={() => log()}>
            <button>
                <img src={googleLogo} alt="google" />
            </button>
        </div>
    )
}

export default Google
