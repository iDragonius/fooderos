import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useBranchStoresQuery } from '../../store/slices/api/branchApiSlice'

const Branches = () => {
    const { data } = useBranchStoresQuery()

    return (
        <div className={'w-full'}>
            <Outlet />
        </div>
    )
}

export default Branches
