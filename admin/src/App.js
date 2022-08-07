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
import { useDispatch } from 'react-redux'
import { setVisitorToken } from './store/slices/authSlice'
import login from './pages/login/Login'

function App() {
    // const { data, isLoading } = useGetProfileQuery(undefined)
    const [check] = useUserMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [visitor, { isLoading: loading }] = useVisitorMutation()
    const { data, isSuccess, isLoading } = useGetProfileQuery()

    const createVisitor = async () => {
        await visitor()
            .unwrap()
            .then((res) => dispatch(setVisitorToken(res.token)))
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            // getUser()
        } else {
            createVisitor()
        }
    }, [])
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
