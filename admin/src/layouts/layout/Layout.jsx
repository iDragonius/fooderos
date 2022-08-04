import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Layout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])
    return <Outlet />
}

export default Layout
