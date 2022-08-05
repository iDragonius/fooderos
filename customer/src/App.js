import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import NavigationLayout from './layouts/navigationLayout/NavigationLayout'
import MyAddresses from './pages/userPages/my-addresses/MyAddresses'
import MyOrders from './pages/userPages/my-orders/MyOrders'
import Profile from './pages/userPages/profile/Profile'
import RequireAuth from './features/auth/RequireAuth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    useGetUserQuery,
    useUserMutation,
} from './store/slices/api/userApiSlice'
import {
    setAuth,
    setCredentials,
    setVisitorToken,
} from './store/slices/authSlice'
import Loader from './components/ui/loader/Loader'
import { useVisitorMutation } from './store/slices/api/visitorApiSlice'
import ProfileSection from './pages/userPages/profile/profileSections/profile/ProfileSection'
import FreeOrdersSection from './pages/userPages/profile/profileSections/freeOrders/FreeOrdersSection'
import Sidebar from './pages/userPages/profile/ui/sidebar/Sidebar'
import Settings from './pages/userPages/profile/profileSections/settings/Settings'
import Support from './pages/userPages/profile/profileSections/support/Support'
import PaymentMethodsSection from './pages/userPages/profile/profileSections/paymentMethods/PaymentMethodsSection'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            setCredentials({
                token: localStorage.getItem('token'),
            })
        )
        localStorage.setItem('lang', 'English')
    }, [])
    const [fetchUser, { isLoading }] = useUserMutation()
    const [visitor, { isLoading: loading }] = useVisitorMutation()
    const getUser = async () => {
        try {
            await fetchUser()
                .unwrap()
                .then((res) => {
                    dispatch(
                        setCredentials({
                            name: res.name,
                            token: localStorage.getItem('token'),
                        })
                    )
                    dispatch(setAuth(true))
                })
        } catch (e) {
            createVisitor()
            localStorage.removeItem('token')
        }
    }

    const createVisitor = async () => {
        await visitor()
            .unwrap()
            .then((res) => dispatch(setVisitorToken(res.token)))
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser()
        } else {
            createVisitor()
        }
    }, [])

    if (isLoading || loading) {
        return <Loader />
    }
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path={'/'} element={<NavigationLayout />}>
                    <Route index element={<Home />} />
                    <Route element={<RequireAuth />}>
                        <Route
                            path={'my-addresses'}
                            element={<MyAddresses />}
                        />
                        <Route path={'my-orders'} element={<MyOrders />} />
                        <Route path={'profile/'} element={<Profile />}>
                            <Route
                                path={'main-info'}
                                element={<ProfileSection />}
                            />
                            <Route
                                path={'free-orders'}
                                element={<FreeOrdersSection />}
                            />
                            <Route
                                path={'payment-methods'}
                                element={<PaymentMethodsSection />}
                            />
                            <Route path={'settings'} element={<Settings />} />
                            <Route path={'support'} element={<Support />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
