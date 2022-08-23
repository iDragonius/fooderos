import { useDeleteTagMutation } from '../../../../../../store/slices/api/tagApiSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { currentId } from '../../../../../../store/slices/languageSlice'
import { toast } from 'react-toastify'
import CommonDropdown from '../../../../../../components/dropdown/commonDropdown/CommonDropdown'

const Dropdown = ({ view, id, setView }) => {
    const [tagDelete] = useDeleteTagMutation()
    const navigate = useNavigate()
    const currId = useSelector(currentId)
    const dispatch = useDispatch()
    const location = useLocation()
    const deleteTag = async () => {
        setView(false)

        await tagDelete({
            id: currId,
        })
            .unwrap()
            .then(() => {
                toast.success('Tag deleted successful!')
            })
    }
    const editTag = async () => {
        setView(false)
        navigate(`/store/${location.pathname.split('/')[2]}/edit/${currId}`)
    }
    return (
        <div className={'relative z-[1000000]'}>
            <CommonDropdown view={view} width={150}>
                <div className={'text-[#565b60]  shadow-md'}>
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
