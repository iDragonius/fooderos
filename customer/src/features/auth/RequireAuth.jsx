import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isAuthorized } from '../../store/slices/authSlice'

const RequireAuth = () => {
    const location = useLocation()
    const token = localStorage.getItem('token')
    return token ? (
        <Outlet />
    ) : (
        <Navigate to="/" sate={{ from: location }} replace />
    )
}

export default RequireAuth
