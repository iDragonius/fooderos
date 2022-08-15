import styles from '../TagTypeModals.module.scss'
import { useTagTypeQuery } from '../../../../../store/slices/api/tagApiSlice'
import TypeStatus from '../status/TypeStatus'

const ShowTagTypes = ({ setOpen }) => {
    const closeModal = () => {
        document.body.style.overflow = ''

        setOpen(false)
    }
    const { data, isSuccess, isLoading } = useTagTypeQuery()

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

            <div className={styles.tags}>
                {isSuccess && (
                    <div className={'px-10'}>
                        {data.map((type) => (
                            <div
                                key={type.id}
                                className={
                                    'flex justify-between items-center rounded-md py-3 px-4 border-[1px] mb-1'
                                }
                            >
                                <div className={'flex'}>
                                    <div className={'mr-1'}>{type.id}</div>
                                    <div>{type.name}</div>
                                </div>

                                <div>
                                    {type.status === 1 ? (
                                        <TypeStatus checked={true} />
                                    ) : (
                                        <TypeStatus checked={false} />
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

export default ShowTagTypes
