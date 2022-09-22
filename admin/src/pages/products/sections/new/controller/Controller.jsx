import React from 'react'
import { useSelector } from 'react-redux'
import { allSteps } from '../../../../../store/slices/productSlice'

const Controller = ({ active, setActive }) => {
    const sections = ['General Info', 'Variant Info', 'Add on', 'Review']
    const steps = useSelector(allSteps)
    const back = () => {
        if (sections.indexOf(active) === 0) {
            return
        }
        setActive(steps[steps.indexOf(active) - 1])
    }
    const next = () => {
        if (sections.indexOf(active) === 3) {
            return
        }
        setActive(steps[steps.indexOf(active) + 1])
    }
    return (
        <div className={'flex justify-between'}>
            <button
                onClick={back}
                className={'w-[49%] py-4 text-white bg-[#dddfe4]'}
            >
                BACK
            </button>
            {active === 'Review' ? (
                <button className={'w-[49%] py-4 bg-primary text-white'}>
                    SAVE
                </button>
            ) : (
                <button
                    onClick={next}
                    className={'w-[49%] py-4 bg-primary text-white'}
                >
                    NEXT
                </button>
            )}
        </div>
    )
}

export default Controller
