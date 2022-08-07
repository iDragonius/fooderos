import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './layouts/layout/Layout'
import Login from './pages/login/Login'
import RequireAuth from './features/auth/RequireAuth'
import Dashboard from './pages/dashboard/Dashboard'
import MainLayout from './layouts/mainLayout/MainLayout'
import TagList from './pages/tagList/TagList'
import Orders from './pages/orders/Orders'
import {
    useGetProfileQuery,
    useUserMutation,
} from './store/slices/api/userApiSlice'
import { useEffect } from 'react'
import { useVisitorMutation } from './store/slices/api/visitorApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    isSkip,
    setCredentials,
    setSkip,
    setVisitorToken,
} from './store/slices/authSlice'
import login from './pages/login/Login'
import Loader from './components/loader/Loader'

function App() {
    const [check] = useUserMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const skip = useSelector(isSkip)

    const { data, isLoading, isError } = useGetProfileQuery(undefined, {
        skip,
    })

    // useEffect(() => {
    //     console.log(1)
    //     dispatch(setCredentials({ token: null }))
    //     dispatch(setSkip(true))
    // }, [isError])

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path={'/'} element={<Layout />}>
                    <Route path={'login'} element={<Login />} />

                    <Route element={<RequireAuth />}>
                        <Route element={<MainLayout />}>
                            <Route path={'dashboard'} element={<Dashboard />} />
                            <Route path={'tag-list'} element={<TagList />} />
                            <Route path={'orders'} element={<Orders />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
