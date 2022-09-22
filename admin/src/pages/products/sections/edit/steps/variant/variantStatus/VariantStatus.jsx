import React from 'react'
import { useBranchStatusMutation } from '../../../../../../../store/slices/api/branchApiSlice'
import styles from '../../../../../../store/sections/list/status/Status.module.scss'
import { useDispatch } from 'react-redux'
import {
    setCombinationData,
    setNewCombinationData,
} from '../../../../../../../store/slices/productSlice'

const VariantStatus = ({ checked, id, setStatus, old }) => {
    const dispatch = useDispatch()
    const handleStatus = async (e) => {
        if (old) {
            dispatch(
                setCombinationData({
                    type: 'status',
                    name: id,
                    value: e.target.checked ? 1 : 0,
                })
            )
        } else {
            dispatch(
                setNewCombinationData({
                    type: 'status',
                    name: id,
                    value: e.target.checked ? 1 : 0,
                })
            )
        }

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

export default VariantStatus
