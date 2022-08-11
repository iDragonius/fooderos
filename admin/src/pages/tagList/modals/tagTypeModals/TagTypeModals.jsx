import React, { useRef } from 'react'
import CommonModal from '../../../../components/modals/commonModal/CommonModal'

import NewTagType from './newTagType/NewTagType'
import Show from './show/Show'
const TagTypeModals = ({ setOpen, open, section }) => {
    return (
        <CommonModal setOpen={setOpen} open={open}>
            {section === 'newTagType' && <NewTagType setOpen={setOpen} />}
            {section === 'show' && <Show setOpen={setOpen} />}
        </CommonModal>
    )
}

export default TagTypeModals
