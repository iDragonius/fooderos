import React from 'react'
import { useBranchStatusMutation } from '../../../../../../../store/slices/api/branchApiSlice'
import styles from '../../../../../../store/sections/list/status/Status.module.scss'

const VariantStatus = ({ checked }) => {
    // const handleStatus = async (e) => {
    //     await changeStatus({
    //         id: Number(
    //             e.target.parentNode.parentNode.parentNode.childNodes[0]
    //                 .innerHTML
    //         ),
    //         status: e.target.checked ? 1 : 0,
    //     })
    //
    // }
    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                defaultChecked={checked}
                // onChange={handleStatus}
            />
            <span className={styles.slider + ' ' + styles.round}></span>
        </label>
    )
}

export default VariantStatus
