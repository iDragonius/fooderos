import React, { useState } from 'react'
import $api from '../../../http'
const Profile = () => {
    const [user, setUser] = useState('')
    const fetch = async () => {
        $api.post('/user').then((res) => setUser(res.data.name))
    }
    return (
        <>
            <div onClick={fetch}>Profile</div>
            <div>{user}</div>
        </>
    )
}

export default Profile
