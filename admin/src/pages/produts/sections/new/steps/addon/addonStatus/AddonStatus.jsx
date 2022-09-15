import React from 'react'
import styles from '../../../../../../store/sections/list/status/Status.module.scss'
import { useDispatch } from 'react-redux'
import { setAddonData } from '../../../../../../../store/slices/productSlice'

const AddonStatus = ({ checked, setStatus, id }) => {
    const dispatch = useDispatch()
    const handleStatus = async (e) => {
        dispatch(
            setAddonData({
                type: 'status',
                id,
                value: e.target.checked ? 1 : 0,
            })
        )
        setStatus(e.target.checked)
    }
    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                defaultChecked={checked}
                onChange={handleStatus}
            />
            <span className={styles.slider + ' ' + styles.round}></span>
        </label>
    )
}

export default AddonStatus
