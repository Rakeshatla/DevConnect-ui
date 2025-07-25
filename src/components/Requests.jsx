import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'
import ShimmerCard from './ShimmerCard'
import { useNavigate } from 'react-router-dom'

const Requests = () => {
    const requests = useSelector(store => store.request)
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const reviewRequest = async (status, _id) => {
        try {
            // console.log(requests)
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true })
            // console.log(res)
            dispatch(removeRequest(_id));
        }
        catch (err) {
            console.error(err)
        }
    }

    const fetchrequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests", { withCredentials: true })
            // console.log(res?.data.connections)
            dispatch(addRequests(res?.data?.connections))

        }
        catch (err) {
            if (err.response?.status === 404) {
                // console.error(err?.response?.data || "Requests not found");
                setError(err?.response?.data || "Requests not found");
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            }

        }
    }
    useEffect(() => {
        fetchrequests()
    }, [])
    if (!requests)
        return <ShimmerCard />;

    if (requests.length === 0) return <h1 className='font-bold text-2xl text-center my-6'> No requests Found'🥲</h1>;

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-black text-3xl">Requests</h1>
            {
                error && (
                    <div className="text-red-500 bg-red-100 p-2 rounded mt-2 text-center">
                        {error + 'plz login again'}
                    </div>
                )
            }

            {requests.map((connection) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } =
                    connection.formUserId;

                return (
                    <div
                        key={_id}
                        className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto w-2/3"
                    >
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full"
                                src={photoUrl}
                            />
                        </div>
                        <div className="text-left mx-4 ">
                            <h2 className="font-bold text-xl">
                                {firstName + " " + (lastName ? lastName : "")}
                            </h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div>
                            <button
                                className="btn btn-primary mx-2"
                                onClick={() => reviewRequest("rejected", connection._id)}
                            >
                                Reject
                            </button>
                            <button
                                className="btn btn-secondary mx-2"
                                onClick={() => reviewRequest("accepted", connection._id)}
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default Requests
