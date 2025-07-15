import { Link, Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
// import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (userData) return;
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            // console.log(res.data);
            dispatch(addUser(res.data));
        } catch (err) {
            if (err.status === 404) {
                navigate("/login");
            }
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <NavBar />
            {!userData && <p className="flex justify-center my-3 font-extrabold h-3">Welcome to DevConnect❤️</p>}
            <Outlet />

        </div>
    );
};
export default Body;