import Status from '../status/Status'
import Notifications from '../notifications/Notifications'
import User from '../user/User'
const Header = () => {
    return (
        <div
            className={'px-6 flex justify-between py-3'}
            style={{ boxShadow: ' 0px 1px 4px rgba(0,0,0,0.4)' }}
        >
            <div className={'flex items-center'}>
                <div className={'h-10 w-10 bg-[#1063fb] mr-16'}></div>
                <h1 className={'text-[20px] text-[#1d1d1d]'}>Super Admin</h1>
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
