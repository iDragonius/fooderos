import React from 'react'

const Controller = ({ active, setActive }) => {
    const sections = ['General Info', 'Variant Info', 'Add on', 'Review']

    const back = () => {
        if (sections.indexOf(active) === 0) {
            return
        }
        const i = sections.indexOf(active) - 1
        setActive(sections[i])
    }
    const next = () => {
        if (sections.indexOf(active) === 3) {
            return
        }
        const i = sections.indexOf(active) + 1
        setActive(sections[i])
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
