import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Branches = () => {
    return (
        <div className={'w-full'}>
            <Outlet />
        </div>
    )
}

export default Branches
