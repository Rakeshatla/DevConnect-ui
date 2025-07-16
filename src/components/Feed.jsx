import React, { useEffect } from 'react'
import Usercard from './Usercard'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import axios from 'axios'
import { addFeed } from '../utils/feedSlice';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const feed = useSelector(store => store.feed)
    const fetchfeed = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true })
            // console.log(res?.data)
            dispatch(addFeed(res?.data))
            // console.log(res)
        }
        catch (err) {
            if (err.response?.status === 404) {
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
        }
    }
    useEffect(() => {
        fetchfeed()
    }, [])
    if (!feed) return
    if (feed.length === 0) return <h1 className='flex justify-center font-bold text-3xl my-10'> No users found!..🥲🥲</h1 >
    return (
        feed && (<div className='flex justify-center my-10'>
            <Usercard user={feed[0]} />
        </div>)
    )
}

export default Feed
