import styles from '../../LoginModal.module.scss'
import facebook from '../../../../../../assets/img/facebook.svg'
import FacebookAuth from 'react-facebook-auth'
import {setAuth, setCredentials, setScProvider} from "../../../../../../store/slices/authSlice";
import {useDispatch} from "react-redux";
import {useLoginScMutation} from "../../../../../../store/slices/api/authApiSlice";
const FacebookButton = ({ onClick }) => (
    <div className={styles.socialNetwork} onClick={onClick}>
        <button>
            <img src={facebook} alt="facebook" />
        </button>
    </div>
)

const Facebook = ({setSc, setStep, setOpen}) => {
    const dispatch = useDispatch()
    const [login] = useLoginScMutation()
    const handleLogin = async  (res) =>{
            dispatch(setCredentials({ name:res.name,} ))
            sessionStorage.setItem('email', res.email)
            await login({
                name:res.name ,
                email:res.email ,
                social_providers:1
            })
                .unwrap()
                .then((data)=>{
                    dispatch(setScProvider(1))
                    console.log(data)
                    if(data.status==0){
                        setSc(true)
                        setStep(true)

                    }
                    if(data.status==1){
                        localStorage.setItem('token',data.token)
                        dispatch(setCredentials({ token:data.token}))
                        dispatch(setAuth(true))
                        setSc(false)

                        setStep(false)
                        setOpen(false)
                    }
                }).catch(e=>{
                    console.log(e)
                })

    }

    return (
        <FacebookAuth
            appId="1184179632373415"
            callback={handleLogin}
            component={FacebookButton}
        />
    )
}

export default Facebook
