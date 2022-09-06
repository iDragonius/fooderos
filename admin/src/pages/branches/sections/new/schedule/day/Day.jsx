import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import schedule from '../Schedule'

const Day = ({ day, options, setSchedule, schedule, auto, setAuto }) => {
    const [closed, setClosed] = useState(false)
    const [tempStart, setTempStart] = useState('')
    const [tempEnd, setTempEnd] = useState('')

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
    useEffect(() => {
        let days = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ]
        const temp = {
            ...schedule,
        }
        if (tempStart) {
            temp[day].start = tempStart
        }
        if (tempEnd) {
            temp[day].end = tempEnd
        }
        temp[day].closed = closed
        setSchedule((old) => ({ ...temp }))
    }, [tempStart, tempEnd, closed])

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
                defaultValue={options[10]}
                onChange={(data) => setTempStart(data.value)}
                isDisabled={closed}
            />
            <Select
                options={options}
                styles={customStyles}
                className={closed ? 'mr-12 opacity-30' : 'mr-12'}
                defaultValue={options[24]}
                onChange={(data) => setTempEnd(data.value)}
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
