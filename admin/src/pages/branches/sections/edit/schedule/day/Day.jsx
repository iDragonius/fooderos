import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import {
    completed,
    currBranchSchedule,
} from '../../../../../../store/slices/branchListSlice'

const Day = ({ day, options, setSchedule, schedule, base }) => {
    const [closed, setClosed] = useState(false)
    const [tempStart, setTempStart] = useState('')
    const [tempEnd, setTempEnd] = useState('')
    const currentBranchSchedule = useSelector(currBranchSchedule)
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
        const temp = JSON.parse(JSON.stringify(schedule))
        if (tempStart) {
            temp[day].start = tempStart.value
        }
        if (tempEnd) {
            temp[day].end = tempEnd.value
        }
        temp[day].closed = closed

        setSchedule((old) => ({ ...temp }))
    }, [tempStart, tempEnd, closed])

    useEffect(() => {
        setClosed(schedule[day].closed)
        setTempEnd({ value: schedule[day].end, label: schedule[day].end })
        setTempStart({ value: schedule[day].start, label: schedule[day].start })
    }, [base])
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
                value={tempStart}
                onChange={(data) => setTempStart(data)}
                isDisabled={closed}
            />
            <Select
                options={options}
                styles={customStyles}
                className={closed ? 'mr-12 opacity-30' : 'mr-12'}
                value={tempEnd}
                onChange={(data) => setTempEnd(data)}
                isDisabled={closed}
            />

            <input
                checked={closed}
                type="checkbox"
                onChange={(e) => setClosed(e.target.checked)}
            />
        </div>
    )
}

export default Day
