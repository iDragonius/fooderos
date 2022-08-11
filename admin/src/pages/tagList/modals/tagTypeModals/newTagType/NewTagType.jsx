import styles from '../TagTypeModals.module.scss'
import React, { useRef } from 'react'
import { useCreateTypeMutation } from '../../../../../store/slices/api/tagApiSlice'
import { toast } from 'react-toastify'
const NewTagType = ({ setOpen }) => {
    const closeModal = () => {
        document.body.style.overflow = ''

        setOpen(false)
    }
    const nameRef = useRef()
    const [create] = useCreateTypeMutation()
    const createType = async (e) => {
        e.preventDefault()
        if (!nameRef.current.value) {
            return toast.warn('Tag name must be filled out')
        }
        await create({
            name: nameRef.current.value,
        })
            .unwrap()
            .then(() => {
                toast.success('Tag Type created successful!')
                setOpen(false)
            })
            .catch((e) => {
                toast.error('Smth get wrong')
            })
    }
    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>Add new tag type</h1>
                <div>
                    <button
                        onClick={createType}
                        className={styles.btn + ' ' + styles.save}
                    >
                        Save
                    </button>
                    <button
                        onClick={closeModal}
                        className={styles.btn + ' ' + styles.cancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <div className={styles.tagType}>
                <div className={styles.input}>
                    <input
                        type="text"
                        className={styles.inp}
                        required={true}
                        ref={nameRef}
                    />
                    <label className={styles.inputL}>Tag Name</label>
                </div>
            </div>
            <p className={'text-[#9A9FA5] text-[12px] px-14 mt-1 mb-9'}>
                The new tag type which appears in tag list tag type selection
            </p>
        </>
    )
}

export default NewTagType
