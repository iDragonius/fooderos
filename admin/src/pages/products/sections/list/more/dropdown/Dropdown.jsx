import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { currentId } from '../../../../../../store/slices/languageSlice'
import { toast } from 'react-toastify'
import CommonDropdown from '../../../../../../components/dropdown/commonDropdown/CommonDropdown'
import { useDeleteProductMutation } from '../../../../../../store/slices/api/productApiSlice'

const Dropdown = ({ view, id, setView }) => {
    const [productDelete] = useDeleteProductMutation()
    const navigate = useNavigate()
    const currId = useSelector(currentId)
    const location = useLocation()
    const deleteCatalog = async () => {
        setView(false)

        await productDelete({
            id: currId,
        })
            .unwrap()
            .then(() => {
                toast.success('Product deleted successful!')
            })
    }
    const editCatalog = async () => {
        setView(false)
        navigate(`/products/${location.pathname.split('/')[2]}/edit/${currId}`)
    }
    return (
        <div className={'relative z-[1000000]'}>
            <CommonDropdown view={view} width={150}>
                <div className={'text-[#565b60]  shadow-md'}>
                    <div
                        className={
                            'px-5 py-3 hover:bg-primary hover:text-white transition-all ease-in-out cursor-pointer'
                        }
                        onClick={editCatalog}
                    >
                        Edit
                    </div>
                    <div
                        className={
                            'px-5 py-3 hover:bg-primary hover:text-white transition-all ease-in-out cursor-pointer'
                        }
                        onClick={deleteCatalog}
                    >
                        Delete
                    </div>
                </div>
            </CommonDropdown>
        </div>
    )
}

export default Dropdown
