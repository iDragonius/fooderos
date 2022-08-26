import styles from './Status.module.scss'
import { useStoreStatusMutation } from '../../../../../store/slices/api/storeApiSlice'

const Status = ({ checked }) => {
    const [changeStatus] = useStoreStatusMutation()

    const handleStatus = async (e) => {
        await changeStatus({
            id: Number(
                e.target.parentNode.parentNode.parentNode.childNodes[0]
                    .innerHTML
            ),
            status: e.target.checked ? 1 : 0,
        })
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
