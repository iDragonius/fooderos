import styles from './TypeStatus.module.scss'
import { useTypeStatusMutation } from '../../../../../store/slices/api/tagApiSlice'

const TypeStatus = ({ checked }) => {
    const [changeStatus] = useTypeStatusMutation()

    const handleStatus = async (e) => {
        await changeStatus({
            id: Number(
                e.target.parentNode.parentNode.parentNode.childNodes[0]
                    .childNodes[0].innerHTML
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

export default TypeStatus
