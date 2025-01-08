import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [email, setEmail] = useState("rakesh@gmail.com");
    const [password, setPassword] = useState("Rakesh@123");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toast, setToast] = useState(false);

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/login",
                {
                    email,
                    password,
                },
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
            setToast(true)
            setTimeout(() => {
                setToast(false)
            }, 6000)
            return navigate("/");
        } catch (err) {
            if (err.status === 404) {
                setError(err?.response?.data);
            }
        }
    };

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, email, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
            return navigate("/profile");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">
                        {isLoginForm ? "Login" : "Sign Up"}
                    </h2>
                    <div>
                        {!isLoginForm && (
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
                            </>
                        )}
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Email ID:</span>
                            </div>
                            <input
                                type="text"
                                value={email}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
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
                        </label>
                    </div>
                    <p className="text-red-500">{error}</p>
                    {toast && <div className="toast toast-top toast-center">

                        <div className="alert alert-success">
                            <span>Profile Updated Successfully.</span>
                        </div>
                    </div>}
                    <div className="card-actions justify-center m-2">
                        <button
                            className="btn btn-primary"
                            onClick={isLoginForm ? handleLogin : handleSignUp}
                        >
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>

                    <p
                        className="m-auto cursor-pointer py-2"
                        onClick={() => setIsLoginForm((value) => !value)}
                    >
                        {isLoginForm
                            ? "New User? Signup Here"
                            : "Existing User? Login Here"}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Login;