import React from 'react'
import { Outlet } from 'react-router-dom'

const Products = () => {
    return (
        <div className={'w-full'}>
            <Outlet />
        </div>
    )
}

export default Products
