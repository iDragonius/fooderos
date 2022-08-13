import React, { useEffect, useState } from 'react'
import Dropdown from './dropdown/Dropdown'
import { setId } from '../../../store/slices/languageSlice'
import { useDispatch } from 'react-redux'

const More = () => {
    const [view, setView] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        document.addEventListener('click', () => {
            setView(false)
        })
        return document.removeEventListener('click', () => {
            setView(false)
        })
    })
    const actions = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setView(true)
        dispatch(setId(e.target.parentNode.parentNode.childNodes[0].innerHTML))
    }
    return (
        <>
            <Dropdown setView={setView} view={view} />
            <div className={'cursor-pointer'} onClick={actions}>
                ...
            </div>
        </>
    )
}

export default More
