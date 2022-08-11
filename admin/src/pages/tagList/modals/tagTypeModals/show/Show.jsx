import styles from '../TagTypeModals.module.scss'
import { useTagTypeQuery } from '../../../../../store/slices/api/tagApiSlice'
import Status from '../../../sections/list/status/Status'

const Show = ({ setOpen }) => {
    const closeModal = () => {
        document.body.style.overflow = ''

        setOpen(false)
    }
    const { data, isSuccess } = useTagTypeQuery()
    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>Tag Types</h1>

                <button
                    onClick={closeModal}
                    className={styles.btn + ' ' + styles.cancel}
                >
                    Cancel
                </button>
            </div>

            <div className={styles.tagType}>
                {isSuccess && (
                    <div>
                        {data.map((type) => (
                            <div key={type.id}>
                                <div>{type.name}</div>
                                <div>
                                    {type.status === 1 ? (
                                        <Status checked={true} />
                                    ) : (
                                        <Status checked={false} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Show
