import { Link, useNavigate } from "react-router-dom";
import { ProfileDP } from "./BlogCard";
import { useState } from "react";

export const AppBar = ({author} : {author : string | undefined}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout= () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };
    return <div className=" border-b  flex justify-between px-10 py-4">
        <Link to={`/blogs`} className="flex flex-col justify-center cursor-pointer">
                Medium
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
            >
                <ProfileDP author={author} size = "large"/>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl">
                <button
                    onClick={handleLogout}
                    className="block px-4 py-2 w-full text-gray-800 hover:bg-gray-200"
                >
                    Logout
                </button>
                </div>
            )}
        </div>
    </div>
};