import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import Usercard from './Usercard'


const Profile = () => {
    const user1 = useSelector(store => store.user)
    return (
        user1 && (<div className='flex justify-center mx-4 p-4'>
            <EditProfile user={user1} />
        </div>)
    )
}

export default Profile
