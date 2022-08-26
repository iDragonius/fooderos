import Status from '../status/Status'
import Notifications from '../notifications/Notifications'
import User from '../user/User'
import { useLocation } from 'react-router-dom'
import { useBranchStoresQuery } from '../../../../../store/slices/api/branchApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    allStores,
    currBranchName,
    setCurrent,
} from '../../../../../store/slices/branchListSlice'
import { useEffect, useState } from 'react'
const Header = () => {
    const location = useLocation()
    const stores = useSelector(allStores)
    const dispatch = useDispatch()
    const name = useSelector(currBranchName)

    const [view, setView] = useState(false)
    useEffect(() => {
        document.addEventListener('click', () => {
            setView(false)
        })
        return document.removeEventListener('click', () => {
            setView(false)
        })
    })
    return (
        <div
            className={'px-6 flex justify-between py-3'}
            style={{ boxShadow: ' 0px 1px 4px rgba(0,0,0,0.4)' }}
        >
            <div className={'flex items-center'}>
                <div className={'h-10 w-10 bg-[#1063fb] mr-16'}></div>
                {location.pathname.split('/')[1] === 'branches' ? (
                    <div className={'relative'}>
                        <div
                            className={
                                'text-[20px] text-[#1d1d1d] cursor-pointer'
                            }
                            onClick={(e) => {
                                e.stopPropagation()
                                view ? setView(false) : setView(true)
                            }}
                        >
                            {name ? name : 'Choose Store'}
                        </div>
                        <div
                            className={
                                view
                                    ? 'absolute top-10 py-4 px-2 w-40 -left-4 bg-white shadow-lg '
                                    : 'hidden'
                            }
                        >
                            {stores.map((store) => (
                                <div
                                    key={store.id}
                                    className={
                                        'py-2 px-3 hover:bg-primary hover:text-white cursor-pointer transition-all ease-in-out'
                                    }
                                    onClick={() => {
                                        dispatch(
                                            setCurrent({
                                                name: store.name,
                                                id: store.id,
                                            })
                                        )
                                        setView(false)
                                    }}
                                >
                                    {store.name}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <h1 className={'text-[20px] text-[#1d1d1d]'}>
                        Super Admin
                    </h1>
                )}
            </div>
            <div className={'flex items-center'}>
                <Status />
                <Notifications />
                <User />
            </div>
        </div>
    )
}

export default Header
