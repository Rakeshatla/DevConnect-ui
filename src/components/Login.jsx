import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [email, setEmail] = useState("rakesh@gmail.com");
    const [password, setPassword] = useState("Abcd@123");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                `${BASE_URL}/login`,
                { email, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
            setToast(true);
            setTimeout(() => setToast(false), 6000);
            navigate("/");
        } catch (err) {
            setError(err?.response?.data || "Login failed");
        }
    };

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                `${BASE_URL}/signup`,
                { firstName, lastName, email, password, skills },
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
            navigate("/profile");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

    const handleSkillKeyDown = (e) => {
        if (e.key === "Enter" && skillInput.trim()) {
            e.preventDefault();
            if (!skills.includes(skillInput.trim())) {
                setSkills([...skills, skillInput.trim()]);
            }
            setSkillInput("");
        } else if (e.key === "Backspace" && !skillInput && skills.length) {
            setSkills(skills.slice(0, -1));
        }
    };

    const removeSkill = (idx) => setSkills(skills.filter((_, i) => i !== idx));

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">
                        {isLoginForm ? "Login" : "Sign Up"}
                    </h2>

                    {!isLoginForm && (
                        <>
                            <label className="form-control w-full max-w-xs my-2">
                                <span className="label-text">First Name</span>
                                <input
                                    type="text"
                                    placeholder="enter firstName"
                                    value={firstName}
                                    className="input input-bordered w-full"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>

                            <label className="form-control w-full max-w-xs my-2">
                                <span className="label-text">Last Name</span>
                                <input
                                    type="text"
                                    placeholder="enter lastName"
                                    value={lastName}
                                    className="input input-bordered w-full"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                        </>
                    )}

                    <label className="form-control w-full max-w-xs my-2">
                        <span className="label-text">Email ID:</span>
                        <input
                            type="email"
                            placeholder="enter emailId"
                            value={email}
                            className="input input-bordered w-full"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label className="form-control w-full max-w-xs my-2">
                        <span className="label-text">Password</span>
                        <input
                            type="password"
                            placeholder="enter password"
                            value={password}
                            className="input input-bordered w-full"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    {/* ✅ Skills tags input moved below Password */}
                    {!isLoginForm && (
                        <label className="form-control w-full max-w-xs my-2">
                            <span className="label-text">Skills</span>
                            <div className="flex flex-wrap gap-1 p-1 border rounded">
                                {skills.map((s, i) => (
                                    <span
                                        key={i}
                                        className="flex items-center bg-blue-100 px-2 py-1 rounded-full"
                                    >
                                        {s}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(i)}
                                            className="ml-1 text-red-500 font-bold"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={skillInput}
                                    placeholder="Add skill and press Enter"
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={handleSkillKeyDown}
                                    className="input input-sm flex-1 min-w-[100px] border-none focus:outline-none"
                                />
                            </div>
                        </label>
                    )}

                    <p className="text-red-500">{error}</p>

                    {toast && (
                        <div className="toast toast-top toast-center">
                            <div className="alert alert-success">
                                <span>Profile Updated Successfully.</span>
                            </div>
                        </div>
                    )}

                    <div className="card-actions justify-center my-2">
                        <button
                            className="btn btn-primary"
                            onClick={isLoginForm ? handleLogin : handleSignUp}
                        >
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>

                    <p
                        className="m-auto cursor-pointer py-2 text-blue-500"
                        onClick={() => setIsLoginForm((v) => !v)}
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
