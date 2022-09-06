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
import { useDispatch, useSelector } from 'react-redux'
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
import { useEffect } from 'react'
import StoreEdit from './pages/store/sections/edit/StoreEdit'
import Branches from './pages/branches/Branches'
import BranchList from './pages/branches/sections/list/BranchList'
import NewBranch from './pages/branches/sections/new/NewBranch'
import BranchEdit from './pages/branches/sections/edit/BranchEdit'
import { setCurrent } from './store/slices/branchListSlice'
import Catalogs from './pages/catalogs/Catalogs'
import CatalogList from './pages/catalogs/sections/list/CatalogList'
import NewCatalog from './pages/catalogs/sections/new/NewCatalog'
import CatalogEdit from './pages/catalogs/sections/edit/CatalogEdit'

function App() {
    const skip = useSelector(isSkip)
    const dispatch = useDispatch()
    const { data, isLoading } = useGetProfileQuery(undefined, {
        skip,
    })
    useEffect(() => {
        if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'Az')
        if (localStorage.getItem('store_id') && localStorage.getItem('store')) {
            dispatch(
                setCurrent({
                    id: localStorage.getItem('store_id'),
                    name: localStorage.getItem('store'),
                })
            )
        } else {
            localStorage.removeItem('store')
            localStorage.removeItem('store_id')
        }
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
                            <Route index element={<Dashboard />} />
                            <Route path={'tags/'} element={<TagList />}>
                                <Route path={'restaurants/'}>
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
                                <Route path={'restaurants/'}>
                                    <Route
                                        path={'list'}
                                        element={<StoreList />}
                                    />
                                    <Route
                                        path={'new'}
                                        element={<NewStore />}
                                    />
                                    <Route
                                        path={'edit/:id'}
                                        element={<StoreEdit />}
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
                                    <Route
                                        path={'edit/:id'}
                                        element={<StoreEdit />}
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
                                    <Route
                                        path={'edit/:id'}
                                        element={<StoreEdit />}
                                    />
                                </Route>
                            </Route>
                            <Route path={'catalogs/'} element={<Catalogs />}>
                                <Route path={'restaurants/'}>
                                    <Route
                                        path={'list'}
                                        element={<CatalogList />}
                                    />
                                    <Route
                                        path={'new'}
                                        element={<NewCatalog />}
                                    />
                                    <Route
                                        path={'edit/:id'}
                                        element={<CatalogEdit />}
                                    />
                                </Route>
                                <Route path={'grocery/'}>
                                    <Route
                                        path={'list'}
                                        element={<CatalogList />}
                                    />
                                    <Route
                                        path={'new'}
                                        element={<NewCatalog />}
                                    />
                                    <Route
                                        path={'edit/:id'}
                                        element={<CatalogEdit />}
                                    />
                                </Route>
                                <Route path={'pastries/'}>
                                    <Route
                                        path={'list'}
                                        element={<CatalogList />}
                                    />
                                    <Route
                                        path={'new'}
                                        element={<NewCatalog />}
                                    />
                                    <Route
                                        path={'edit/:id'}
                                        element={<CatalogEdit />}
                                    />
                                </Route>
                            </Route>
                            <Route path={'users/'} element={<Users />}>
                                <Route path={'list'} element={<UsersList />} />
                            </Route>
                            <Route path={'branches/'} element={<Branches />}>
                                <Route path={'list'} element={<BranchList />} />
                                <Route path={'new'} element={<NewBranch />} />
                                <Route
                                    path={'edit/:id'}
                                    element={<BranchEdit />}
                                />
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
