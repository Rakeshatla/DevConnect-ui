import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'
import ShimmerCard from './ShimmerCard'

const Connections = () => {
    const conn = useSelector(store => store.connection)
    const dispatch = useDispatch();
    const fetchconnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
            // console.log(res)
            dispatch(addConnection(res?.data?.data))
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchconnections()
    }, [])
    if (!conn) return <ShimmerCard />;

    if (conn.length === 0) return <h1 className='flex text-center justify-center text-2xl font-extrabold'> No Connections Found</h1>;

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-black text-3xl">Connections</h1>

            {conn.map((connection) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } =
                    connection;

                return (
                    <div key={_id} className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full object-cover"
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
                        <div><Link to={'/chat/' + _id}><button className='btn btn-primary'>Chat</button></Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default Connections
