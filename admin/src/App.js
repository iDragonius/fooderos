import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './layouts/layout/Layout'
import Login from './pages/login/Login'
import RequireAuth from './features/auth/RequireAuth'
import Dashboard from './pages/dashboard/Dashboard'
import MainLayout from './layouts/mainLayout/MainLayout'
import TagList from './pages/tagList/TagList'
import Orders from './pages/orders/Orders'
import { useGetProfileQuery } from './store/slices/api/userApiSlice'

import { useSelector } from 'react-redux'
import { isSkip } from './store/slices/authSlice'
import login from './pages/login/Login'
import Loader from './components/loader/Loader'
import List from './pages/tagList/sections/list/List'
import NewTag from './pages/tagList/sections/newTag/NewTag'
import TagEdit from './pages/tagList/sections/edit/TagEdit'
import Settings from './pages/settings/Settings'
import Users from './pages/users/Users'
import UsersList from './pages/users/sections/list/UsersList'
import Store from './pages/store/Store'
import StoreList from './pages/store/sections/list/StoreList'
import NewStore from './pages/store/sections/new/NewStore'

function App() {
    const skip = useSelector(isSkip)

    const { data, isLoading, isError } = useGetProfileQuery(undefined, {
        skip,
    })

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
                            <Route path={'tags/'} element={<TagList />}>
                                <Route path={'restaurant/'}>
                                    <Route path={'new'} element={<NewTag />} />
                                    <Route path={'list'} element={<List />} />
                                    <Route
                                        path={'edit/:id'}
                                        element={<TagEdit />}
                                    />
                                </Route>
                                <Route path={'grocery/'}>
                                    <Route path={'new'} element={<NewTag />} />
                                    <Route path={'list'} element={<List />} />
                                    <Route
                                        path={'edit/:id'}
                                        element={<TagEdit />}
                                    />
                                </Route>
                                <Route path={'pastries/'}>
                                    <Route path={'new'} element={<NewTag />} />
                                    <Route path={'list'} element={<List />} />
                                    <Route
                                        path={'edit/:id'}
                                        element={<TagEdit />}
                                    />
                                </Route>
                            </Route>
                            <Route path={'store/'} element={<Store />}>
                                <Route path={'restaurant/'}>
                                    <Route
                                        path={'list'}
                                        element={<StoreList />}
                                    />
                                    <Route
                                        path={'new'}
                                        element={<NewStore />}
                                    />
                                </Route>
                                <Route path={'grocery/'}>
                                    <Route
                                        path={'list'}
                                        element={<StoreList />}
                                    />
                                    <Route
                                        path={'new'}
                                        element={<NewStore />}
                                    />
                                </Route>
                                <Route path={'pastries/'}>
                                    <Route
                                        path={'list'}
                                        element={<StoreList />}
                                    />
                                    <Route
                                        path={'new'}
                                        element={<NewStore />}
                                    />
                                </Route>
                            </Route>
                            <Route path={'users/'} element={<Users />}>
                                <Route path={'list'} element={<UsersList />} />
                            </Route>

                            <Route path={'orders'} element={<Orders />} />
                            <Route path={'settings'} element={<Settings />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
