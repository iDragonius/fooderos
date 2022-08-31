import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import schedule from '../Schedule'
import { useSelector } from 'react-redux'
import { currBranchSchedule } from '../../../../../../store/slices/branchListSlice'

const Day = ({ day, options, setSchedule, schedule }) => {
    const [closed, setClosed] = useState(false)
    const [tempStart, setTempStart] = useState('')
    const [tempEnd, setTempEnd] = useState('')
    const [start, setStart] = useState({ label: '', value: '' })
    const [end, setEnd] = useState({ label: '', value: '' })

    const currentSchedule = useSelector(currBranchSchedule)
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
    useEffect(() => {
        setStart({
            label: currentSchedule[day].start
                ? currentSchedule[day].start
                : { label: '', value: '' },
            value: currentSchedule[day].start
                ? currentSchedule[day].start
                : { label: '', value: '' },
        })
        setEnd({
            label: currentSchedule[day].end
                ? currentSchedule[day].end
                : { label: '', value: '' },
            value: currentSchedule[day].end
                ? currentSchedule[day].end
                : { label: '', value: '' },
        })
    }, [currentSchedule])
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
                value={start}
                onChange={(data) => setTempStart(data.value)}
                isDisabled={closed}
            />
            <Select
                options={options}
                styles={customStyles}
                value={end}
                className={closed ? 'mr-12 opacity-30' : 'mr-12'}
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
