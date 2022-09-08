import React, { useEffect } from 'react'
import styles from '../../../tagList/headers/Header.module.scss'
import arrow from '../../../../assets/img/pages/arrow.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { allLangs } from '../../../../store/slices/storeSlice'
import {
    catalogStatus,
    checkCatalogData,
    currNames,
    deleteData,
    destroyStatus,
    setNames,
} from '../../../../store/slices/catalogSlice'
import { useEditCatalogMutation } from '../../../../store/slices/api/catalogApiSlice'
import { toast } from 'react-toastify'

const CatalogEditHeader = ({ type, store, image, unique, name }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const langs = useSelector(allLangs)

    const status = useSelector(catalogStatus)
    const back = () => {
        navigate(`/catalogs/${location.pathname.split('/')[2]}/list`)
    }
    useEffect(() => {
        if (status) {
            editCatalog()
        }
        return destroy()
    }, [status])
    const destroy = () => {
        dispatch(destroyStatus())
    }
    const currentNames = useSelector(currNames)
    const [edit] = useEditCatalogMutation()
    const editCatalog = async () => {
        if (!currentNames['Az_name']) {
            return toast.warn('Fill the <Az> catalog name')
        }
        await edit({
            name: currentNames['Az_name'],
            image: image[0],
            langs,
            store,
            unique,
            type,
            id: location.pathname.split('/')[4],
            rest:
                location.pathname.split('/')[2][0].toUpperCase() +
                location.pathname.split('/')[2].slice(1),
            ...currentNames,
        })
            .unwrap()
            .then(() => {
                dispatch(deleteData())

                navigate(`/catalogs/${location.pathname.split('/')[2]}/list`)
                toast.success('Catalog edited!')
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const handleData = async (e) => {
        e.preventDefault()
        dispatch(setNames({ name }))
        dispatch(checkCatalogData())
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.wrapper}>
                    <div className={styles.name} onClick={back}>
                        <h1 className={styles.section}>
                            <img src={arrow} alt="arrow" />
                        </h1>
                        <h1 className={styles.section}> Edit Catalog</h1>
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

export default CatalogEditHeader
