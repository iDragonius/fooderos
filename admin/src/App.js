import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './layouts/layout/Layout'
import Login from './pages/login/Login'
import RequireAuth from './features/auth/RequireAuth'
import Home from './pages/home/Home'

function App() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path={'/'} element={<Layout />}>
                    <Route path={'login'} element={<Login />} />

                    <Route element={<RequireAuth />}>
                        <Route  path={'/home'} element={<Home />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
