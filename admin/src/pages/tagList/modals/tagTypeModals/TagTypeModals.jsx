import React, { useRef } from 'react'
import CommonModal from '../../../../components/modals/commonModal/CommonModal'

import NewTagType from './newTagType/NewTagType'
import ShowTagTypes from './showTagTypes/ShowTagTypes'
const TagTypeModals = ({ setOpen, open, section }) => {
    return (
        <CommonModal setOpen={setOpen} open={open}>
            {section === 'newTagType' && <NewTagType setOpen={setOpen} />}
            {section === 'show' && <ShowTagTypes setOpen={setOpen} />}
        </CommonModal>
    )
}

export default TagTypeModals
