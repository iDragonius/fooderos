import React from 'react'
import { Outlet } from 'react-router-dom'
import { useBranchStoresQuery } from '../../store/slices/api/branchApiSlice'

const BranchCatalogs = () => {
    const { data } = useBranchStoresQuery()
    return (
        <div className={'w-full'}>
            <Outlet />
        </div>
    )
}

export default BranchCatalogs
