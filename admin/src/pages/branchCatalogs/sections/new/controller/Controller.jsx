import React from 'react'
import { useSelector } from 'react-redux'
import {
    branchCatalogData,
    selectedCatalogs,
} from '../../../../../store/slices/branchCatalogSlice'
import { useCreateBranchCatalogMutation } from '../../../../../store/slices/api/branchCatalogApiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Controller = ({ active, setActive }) => {
    const sections = ['add', 'review']
    const navigate = useNavigate()
    const back = () => {
        if (sections.indexOf(active) === 0) {
            return
        }
        setActive(sections[sections.indexOf(active) - 1])
    }
    const selectedCats = useSelector(selectedCatalogs)

    const next = () => {
        if (sections.indexOf(active) === 1) {
            return
        }
        if (selectedCats.length === 0) {
            toast.warn('Select catalogs')
            return
        }
        setActive(sections[sections.indexOf(active) + 1])
    }

    const catalogs = useSelector(selectedCatalogs)
    const catalogsData = useSelector(branchCatalogData)
    const [create] = useCreateBranchCatalogMutation()
    const save = async () => {
        const temp = []

        catalogsData.map((data) => {
            catalogs.includes(String(data[0].id))
                ? temp.push({ ...data[0], active: 1 })
                : temp.push({ ...data[0], active: 0 })
            for (let i = 1; i < data.length; i++) {
                data[i].map((subData) => {
                    // console.log(subData)
                    subData.map((subSubData, t) => {
                        if (t === 0) {
                            catalogs.includes(String(subSubData.id))
                                ? temp.push({ ...subSubData, active: 1 })
                                : temp.push({ ...subSubData, active: 0 })
                        } else {
                            catalogs.includes(String(subSubData[0].id))
                                ? temp.push({ ...subSubData[0], active: 1 })
                                : temp.push({ ...subSubData[0], active: 0 })
                        }
                    })
                })
            }
        })

        await create({
            branch_id: localStorage.getItem('store_id'),
            catagories: temp,
        })
            .unwrap()
            .then((res) => {
                navigate('/branch-catalogs/list')
            })
    }
    return (
        <div className={'flex justify-between'}>
            <button
                onClick={back}
                className={'w-[49%] py-4 text-white bg-[#dddfe4]'}
            >
                BACK
            </button>
            {active === 'review' ? (
                <button
                    className={'w-[49%] py-4 bg-primary text-white'}
                    onClick={save}
                >
                    SAVE
                </button>
            ) : (
                <button
                    onClick={next}
                    className={'w-[49%] py-4 bg-primary text-white'}
                >
                    NEXT
                </button>
            )}
        </div>
    )
}

export default Controller
