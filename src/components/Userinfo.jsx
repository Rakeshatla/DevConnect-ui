import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

const Userinfo = () => {
    const { id } = useParams(); // 🔁 not _id
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/profile/view/${id}`, {
                    withCredentials: true,
                });
                setUser(res?.data); // ✅ store data in state
            } catch (err) {
                console.error(err);
            }
        };

        fetchdata();
    }, [id]);

    if (!user) return <div className="text-center py-10">Loading user data...</div>;

    const {
        firstName, email, lastName, age, gender, photoUrl, about, skills,
        developerType, availability, location, github, linkedin
    } = user;

    const fullName = `${firstName}${lastName ? ` ${lastName}` : ''}`;

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            {/* Top: Photo & Name */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img
                    src={photoUrl}
                    alt={fullName}
                    className="w-40 h-40 rounded-full object-cover shadow-md"
                />
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-bold">{fullName}</h1>
                    <p className="text-gray-500">{age} • {gender}</p>
                    <p className="mt-2 text-gray-600 italic">{about}</p>
                    <p className="mt-2 text-gray-600 italic">{email}</p>
                </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Skills & Developer Info */}
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {skills?.map((skill, idx) => (
                            <span key={idx} className="badge badge-outline">{skill}</span>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Developer Info</h3>
                    <p><span className="font-medium">Type:</span> {developerType}</p>
                    <p><span className="font-medium">Availability:</span> {availability}</p>
                    <p><span className="font-medium">Location:</span> {location}</p>
                </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Socials */}
            <div>
                <h3 className="font-semibold text-gray-700 mb-2">Social Profiles</h3>
                <div className="flex flex-col gap-1">
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            GitHub: {github}
                        </a>
                    )}
                    {linkedin && (
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            LinkedIn: {linkedin}
                        </a>
                    )}
                </div>
            </div>

            {/* Back Button */}
            <div className="mt-6 text-center">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline btn-primary"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default Userinfo;
