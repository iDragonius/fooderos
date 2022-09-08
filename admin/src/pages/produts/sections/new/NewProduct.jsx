import React, { useState } from 'react'
import NewProductHeader from '../../headers/newProductHeader/NewProductHeader'
import NewProductLanguages from '../../languages/newProductLanguages/NewProductLanguages'
import Step from './step/Step'
import Controller from './controller/Controller'
import General from './steps/General'
import Variants from './steps/Variants'
import Addons from './steps/Addons'
import Review from './steps/Review'

const NewProduct = () => {
    const [active, setActive] = useState('General Info')
    return (
        <>
            <NewProductHeader active={active} setActive={setActive} />
            <NewProductLanguages />
            <Step active={active} setActive={setActive} />
            <div className={'p-10'}>
                {active === 'General Info' && <General />}
                {active === 'Variant Info' && <Variants />}
                {active === 'Add on' && <Addons />}
                {active === 'Review' && <Review />}

                <Controller active={active} setActive={setActive} />
            </div>
        </>
    )
}

export default NewProduct
