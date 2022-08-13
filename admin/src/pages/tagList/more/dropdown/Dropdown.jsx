import React, { useEffect, useState } from 'react'
import CommonDropdown from '../../../../components/dropdown/commonDropdown/CommonDropdown'
import { useDeleteTagMutation } from '../../../../store/slices/api/tagApiSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { currentId, setId } from '../../../../store/slices/languageSlice'

const Dropdown = ({ view, id }) => {
    const [tagDelete] = useDeleteTagMutation()
    const navigate = useNavigate()
    const currId = useSelector(currentId)
    const deleteTag = async () => {
        await tagDelete({
            id: currId,
        })
    }
    const editTag = async () => {
        navigate(`/tags/edit/${currId}`)
    }
    return (
        <div className={'relative z-[1000000]'}>
            <CommonDropdown view={view} width={150}>
                <div className={'text-[#565b60]'}>
                    <div
                        className={
                            'px-5 py-3 hover:bg-primary hover:text-white transition-all ease-in-out cursor-pointer'
                        }
                        onClick={editTag}
                    >
                        Edit
                    </div>
                    <div
                        className={
                            'px-5 py-3 hover:bg-primary hover:text-white transition-all ease-in-out cursor-pointer'
                        }
                        onClick={deleteTag}
                    >
                        Delete
                    </div>
                </div>
            </CommonDropdown>
        </div>
    )
}

export default Dropdown
