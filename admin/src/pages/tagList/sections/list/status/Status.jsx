import React from 'react'
import styles from './Status.module.scss'
import { useStatusMutation } from '../../../../../store/slices/api/tagApiSlice'

const Status = ({ checked }) => {
    const [changeStatus] = useStatusMutation()

    const handleStatus = async (e) => {
        console.log(
            e.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML,
            e.target.checked
        )
        await changeStatus({
            id: Number(
                e.target.parentNode.parentNode.parentNode.childNodes[0]
                    .innerHTML
            ),
            status: e.target.checked ? 1 : 0,
        }).then((res) => console.log(res))
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

export default Status
