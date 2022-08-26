import React from 'react'
import Day from './day/Day'

const Schedule = () => {
    const times = [
        { label: '-', value: '-' },
        { label: '00:00', value: '00:00' },
        { label: '01:00', value: '01:00' },
        { label: '02:00', value: '02:00' },
        { label: '03:00', value: '03:00' },
        { label: '04:00', value: '04:00' },
        { label: '05:00', value: '05:00' },
        { label: '06:00', value: '06:00' },
        { label: '07:00', value: '07:00' },
        { label: '08:00', value: '08:00' },
        { label: '09:00', value: '09:00' },
        { label: '10:00', value: '10:00' },
        { label: '11:00', value: '11:00' },
        { label: '12:00', value: '12:00' },
        { label: '13:00', value: '13:00' },
        { label: '14:00', value: '14:00' },
        { label: '15:00', value: '15:00' },
        { label: '16:00', value: '16:00' },
        { label: '17:00', value: '17:00' },
        { label: '18:00', value: '18:00' },
        { label: '19:00', value: '19:00' },
        { label: '20:00', value: '20:00' },
        { label: '21:00', value: '21:00' },
        { label: '22:00', value: '22:00' },
        { label: '23:00', value: '23:00' },
    ]
    return (
        <div className={'ml-8 w-[512px] h-[560px] shadow-lg'}>
            <div
                className={
                    'bg-primary w-full pl-8 py-4 text-white font-semibold rounded-[4px]'
                }
            >
                Day Of the week
            </div>
            <div
                className={
                    'flex justify-end pt-6 pb-4 border-[1px] text-[#3b3c3e]'
                }
            >
                <p className={'mr-20'}>Start Time</p>
                <p className={'mr-8'}>End Time</p>
                <p className={'mr-8'}>Closed</p>
            </div>
            <div className={'flex flex-col mt-10'}>
                <Day day={'Monday'} options={times} />
                <Day day={'Tuesday'} options={times} />
                <Day day={'Wednesday'} options={times} />
                <Day day={'Thursday'} options={times} />
                <Day day={'Friday'} options={times} />
                <Day day={'Saturday'} options={times} />
                <Day day={'Sunday'} options={times} />
            </div>
        </div>
    )
}

export default Schedule
