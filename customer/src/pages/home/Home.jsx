import React, { useState } from 'react'
import Layout from '../../layouts/layout/Layout'
import Types from './types/Types'
import Categories from './categories/Categories'

const Home = () => {
    const [activeType, setActiveType] = useState('Restaurants')

    return (
        <Layout>
            <div className={'px-12 py-8'}>
                <Types activeType={activeType} setActiveType={setActiveType} />
                <Categories type={activeType} />
            </div>
        </Layout>
    )
}

export default Home
