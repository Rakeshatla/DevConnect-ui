import React from 'react'

const Usercard = ({ user }) => {
    const { _id, firstName, lastName, age, photoUrl, gender, about } = user
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
                    <button className="btn btn-secondary">interested</button>
                    <button className="btn btn-primary">ignore</button>
                </div>
            </div>
        </div>
    )
}

export default Usercard
