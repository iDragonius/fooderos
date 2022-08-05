import styles from '../UserNavigation.module.scss'
import $api from '../../../../../http'
import { logOut, setAuth } from '../../../../../store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useLogOutMutation } from '../../../../../store/slices/api/authApiSlice'
import {useVisitorMutation} from "../../../../../store/slices/api/visitorApiSlice";
const NavigationLogout = () => {
    const dispatch = useDispatch()
    const [userLogout] = useLogOutMutation()
    const [visitor] = useVisitorMutation()
    const logout = async () => {
        try {
            await userLogout().then(async () => {
                localStorage.removeItem('token')
                dispatch(logOut())
                dispatch(setAuth(false))
                await visitor().then()
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div
            onClick={logout}
            className={styles.navElement + ' ' + 'text-orange-500'}
        >
            Logout
        </div>
    )
}

export default NavigationLogout
