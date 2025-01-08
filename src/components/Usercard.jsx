import React from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
// import { userInfo } from 'node:os';

const Usercard = ({ user }) => {
    const {
        _id, firstName, lastName, age, photoUrl, gender, about } = user
    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.log(err)
        }
    };
    return (
        <div className="card bg-base-300 w-96 shadow-xl flex justify-center">
            <figure>
                <img
                    src={photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {firstName}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <h4>{age},{gender}</h4>
                <p>{about}</p>
                <div className="card-actions justify-center my-5">
                    <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>interested</button>
                    <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>ignore</button>
                </div>
            </div>
        </div>
    )
}

export default Usercard
