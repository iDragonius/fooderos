import React, { useEffect } from 'react'
import styles from '../../../tagList/headers/Header.module.scss'
import arrow from '../../../../assets/img/pages/arrow.png'
import { useNavigate } from 'react-router-dom'
import { useCreateBranchMutation } from '../../../../store/slices/api/branchApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    branchStatus,
    checkBranchData,
    currAddresses,
    currId,
    currNames,
    destroyStatus,
    setBranchData,
} from '../../../../store/slices/branchListSlice'

import { allLangs } from '../../../../store/slices/languageSlice'
import { toast } from 'react-toastify'

const NewBranchHeader = ({
    name,
    phone,
    address,
    country,
    city,
    coordinates,
    profile,
    cover,
    currency,
    payment,
    cash_limit,
    amount,
    payload,
    max_distance,
    schedule,
}) => {
    const dispatch = useDispatch()
    const currentId = useSelector(currId)
    const navigate = useNavigate()
    const currentBranchNames = useSelector(currNames)
    const currentAddresses = useSelector(currAddresses)
    const languages = useSelector(allLangs)
    const status = useSelector(branchStatus)
    const back = () => {
        navigate(`/branches/list`)
    }

    useEffect(() => {
        if (status) {
            createBranch()
        }
        return destroy()
    }, [status])
    const destroy = () => {
        dispatch(destroyStatus())
    }
    const [create] = useCreateBranchMutation()
    const createBranch = () => {
        create({
            name: currentBranchNames['Az_name'],
            phone,
            address: currentAddresses['Az_address'],
            country,
            city,
            store_id: currentId,
            lat: coordinates.lat,
            lng: coordinates.lng,
            profile,
            cover,
            currency,
            payment,
            cash_limit,
            amount,
            payload,
            max_distance,
            schedule,
            ...currentBranchNames,
            ...currentAddresses,
            languages,
        }).then(() => {
            toast.success('Branch created successfully!')
            navigate('/branches/list')
        })
    }

    const handleData = async (e) => {
        e.preventDefault()
        dispatch(setBranchData({ name, address }))
        dispatch(checkBranchData())
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <div className={styles.name} onClick={back}>
                        <h1 className={styles.section}>
                            <img src={arrow} alt="" />
                        </h1>
                        <h1 className={styles.section}> New Branch</h1>
                    </div>

                    <div className={styles.btns}>
                        <button
                            className={styles.tag + ' ' + styles.btn}
                            onClick={handleData}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewBranchHeader
