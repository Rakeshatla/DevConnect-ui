import React from 'react'
import { useState } from 'react';
import { useDispatch, } from 'react-redux';
import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import Usercard from './Usercard';

const EditProfile = ({ user }) => {
    // const user = useSelector(store => store.user)
    // const [password, setPassword] = useState("Rakesh@123");
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [showToast, setShowToast] = useState(false);
    const [about, setAbout] = useState(user.about || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
    const [gender, setGender] = useState(user.gender || "");
    const [error, setError] = useState("");
    const [skills, setSkills] = useState("");
    const dispatch = useDispatch();

    const updateprofile = async () => {
        try {
            setError("")
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName, age, gender, about, photoUrl, skills
                },
                { withCredentials: true }
            );
            // console.log(res)
            dispatch(addUser(res?.data?.data));
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        } catch (err) {
            console.log(err)
            setError(err?.response?.data || "Something went wrong");
        }
    };

    return (
        <div className='flex justify-center my-10 mx-10 p-7'>
            <div className="flex justify-center  ">
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center">
                            Update profile
                        </h2>
                        <div>
                            <>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">First Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={firstName}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Last Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">age</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={age}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Gender</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={gender}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">skills</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={skills}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setSkills(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">About</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={about}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">photoUrl</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={photoUrl}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />
                                </label>
                            </>

                            {/*                         
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input
                                type="password"
                                value={password}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label> */}
                        </div>
                        <p className="text-red-500">{error}</p>
                        {showToast && <div className="toast toast-top toast-center">

                            <div className="alert alert-success">
                                <span>Profile Updated Successfully.</span>
                            </div>
                        </div>}
                        <div className="card-actions justify-center m-2">
                            <p>{error}</p>
                            <button
                                className="btn btn-primary " onClick={updateprofile}
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div className='mx-10'>
                <Usercard user={{ firstName, lastName, age, photoUrl, gender, about, skills }} />
            </div>
        </div>
    );
};

export default EditProfile
