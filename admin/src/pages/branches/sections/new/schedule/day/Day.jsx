import React, { useState } from 'react'
import Select from 'react-select'

const Day = ({ day, options }) => {
    const [closed, setClosed] = useState(false)
    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'none',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
    }
    return (
        <div className={'flex justify-between items-center px-8 mb-5'}>
            <p
                className={
                    closed
                        ? 'w-[120px] opacity-30 text-primary'
                        : 'w-[120px]  text-primary'
                }
            >
                {day}
            </p>
            <Select
                styles={customStyles}
                options={options}
                className={closed ? 'mr-10 opacity-30' : 'mr-10'}
                value={options[10]}
                isDisabled={closed}
            />
            <Select
                options={options}
                styles={customStyles}
                className={closed ? 'mr-12 opacity-30' : 'mr-12'}
                value={options[24]}
                isDisabled={closed}
            />

            <input
                type="checkbox"
                onChange={(e) => setClosed(e.target.checked)}
            />
        </div>
    )
}

export default Day
