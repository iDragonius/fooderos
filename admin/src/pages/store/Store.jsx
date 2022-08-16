import React from 'react'
import { Outlet } from 'react-router-dom'

const Store = () => {
    return (
        <div className={'w-full'}>
            <Outlet />
        </div>
    )
}

export default Store
