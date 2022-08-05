import React from 'react'
import styles from '../Sidebar.module.scss'
import { useDispatch } from 'react-redux'
import { useLogOutMutation } from '../../../../../../store/slices/api/authApiSlice'
import { useVisitorMutation } from '../../../../../../store/slices/api/visitorApiSlice'
import {
    logOut,
    setAuth,
    setVisitorToken,
} from '../../../../../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const SidebarLogout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userLogout] = useLogOutMutation()
    const [visitor] = useVisitorMutation()
    const logout = async () => {
        try {
            await userLogout().then(async () => {
                localStorage.removeItem('token')
                dispatch(logOut())
                dispatch(setAuth(false))
                navigate('/')
                await visitor()
                    .unwrap()
                    .then((res) => dispatch(setVisitorToken(res.token)))
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={styles.nav + ' ' + styles.logout} onClick={logout}>
            Logout
        </div>
    )
}

export default SidebarLogout
