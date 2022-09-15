import React from 'react'
import { Outlet } from 'react-router-dom'

const BranchCatalogs = () => {
    return (
        <div className={'w-full'}>
            <Outlet />
        </div>
    )
}

export default BranchCatalogs
