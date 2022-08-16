import React, { useState } from 'react'
import NewStoreHeader from '../../headers/newStoreHeader/NewStoreHeader'
import NewStoreLanguages from '../../languages/newStoreLanguages/NewStoreLanguages'
import ImgUpload from './imgUpload/ImgUpload'

const NewStore = () => {
    const [file, setFile] = useState([])
    return (
        <>
            <NewStoreHeader />
            <NewStoreLanguages />
            <div className={'ml-10 mt-8 flex '}>
                <ImgUpload file={file} setFile={setFile} />
                <div className={'ml-8'}>as</div>
            </div>
        </>
    )
}

export default NewStore
