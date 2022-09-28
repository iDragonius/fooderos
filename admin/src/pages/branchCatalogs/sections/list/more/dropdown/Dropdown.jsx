import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { currentId } from '../../../../../../store/slices/languageSlice'
import { toast } from 'react-toastify'
import CommonDropdown from '../../../../../../components/dropdown/commonDropdown/CommonDropdown'
import { useDeleteStoreMutation } from '../../../../../../store/slices/api/storeApiSlice'
import { useDeleteCatalogMutation } from '../../../../../../store/slices/api/catalogApiSlice'

const Dropdown = ({ view, id, setView }) => {
    const editCatalog = async () => {
        setView(false)
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
                        Add product
                    </div>
                </div>
            </CommonDropdown>
        </div>
    )
}

export default Dropdown
