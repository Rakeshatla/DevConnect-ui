import React from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import Userinfo from './Userinfo';
import { useNavigate } from 'react-router-dom';

const Usercard = ({ user }) => {
    const navigate = useNavigate();
    // console.log(user)
    const handleinfo = (_id) => {
        return navigate('/userInfo/' + _id);
    }

    const {
        _id, firstName, lastName, age, photoUrl,
        gender, about, skills
    } = user;

    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            await axios.post(
                `${BASE_URL}/request/send/${status}/${userId}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.log(err);
        }
    };

    const fullName = firstName + (lastName ? ` ${lastName}` : '');

    return (
        <div className="card w-96 bg-base-200 shadow-xl p-4">
            <figure className="rounded-xl overflow-hidden">
                <img src={photoUrl} alt={fullName} className="h-60 w-full object-cover" />
            </figure>

            <div className="card-body items-center text-center">
                <h2 className="card-title text-xl font-semibold">
                    {fullName}
                </h2>
                <p className="text-sm text-gray-500">{age} | {gender}</p>
                <p className="text-sm my-2">{about}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {skills && skills.map((skill, index) => (
                        <div key={index} className="badge badge-outline">
                            {skill}
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6 w-full">
                    <button
                        className="btn btn-outline btn-error w-24"
                        onClick={() => handleSendRequest("ignored", _id)}
                    >
                        Ignore
                    </button>

                    <button className="btn btn-outline w-24" onClick={() => handleinfo(_id)}>
                        View More
                    </button>

                    <button
                        className="btn btn-success w-24"
                        onClick={() => handleSendRequest("interested", _id)}
                    >
                        Connect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Usercard;
