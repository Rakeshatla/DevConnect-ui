import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'



const Profile = () => {
    const user1 = useSelector(store => store.user)
    // console.log(user1)
    return (
        user1 && (<div className='flex justify-center mx-4 p-4'>
            <EditProfile user={user1} />
        </div>)
    )
}

export default Profile
