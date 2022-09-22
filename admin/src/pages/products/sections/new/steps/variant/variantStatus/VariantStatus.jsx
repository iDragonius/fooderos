import React from 'react'
import { useBranchStatusMutation } from '../../../../../../../store/slices/api/branchApiSlice'
import styles from '../../../../../../store/sections/list/status/Status.module.scss'
import { useDispatch } from 'react-redux'
import { setCombinationData } from '../../../../../../../store/slices/productSlice'

const VariantStatus = ({ checked, id, setStatus }) => {
    const dispatch = useDispatch()
    const handleStatus = async (e) => {
        dispatch(
            setCombinationData({
                type: 'status',
                name: id,
                value: e.target.checked,
            })
        )
        setStatus(e.target.checked)
    }
    return (
        <label className={styles.switch}>
            <input type="checkbox" checked={checked} onChange={handleStatus} />
            <span className={styles.slider + ' ' + styles.round}></span>
        </label>
    )
}

export default VariantStatus
