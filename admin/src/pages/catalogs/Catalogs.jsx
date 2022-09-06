import React from 'react'
import { Outlet } from 'react-router-dom'

const Catalogs = () => {
    return (
        <div className={'w-full'}>
            <Outlet />
        </div>
    )
}

export default Catalogs
