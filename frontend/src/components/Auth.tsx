import { ChangeEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpInputType } from "@rishit.saharan/medium-common";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({type} : {type : "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState < signUpInputType > ({
        username : "",
        password : "",
        name : ""
    });
    async function sendRequest(){
        try{
            const url = `${BACKEND_URL}/api/v1/user/${type}`;
            console.log(url);
            const response = await axios.post(url, postInputs);
            localStorage.setItem("token", response.data.token);
            navigate("/blogs");
        }
        catch(err){
            alert("Error while signing");
        }
    }
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="p-6">
                    <div className="font-extrabold text-3xl">
                        {type === "signin" ? `Enter your Credentials` : `Create an Account`}
                    </div>
                    <div className="text-slate-400 text-l mt-2 text-center">
                        {type === "signin" ? `Don't have an account?` : `Already have an Account?`}
                        <Link to={type === "signin" ? "/signup" : "/signin"} className="ml-1 underline">
                            {type === "signin" ? `Register` : `Login`}
                        </Link>
                    </div>
                </div>
                <div className="w-full ">
                    {type === "signup" ? <LabelledInput label="First Name" placeholder="Rishit ..." onChange={(e) => {
                        setPostInputs((c) => ({
                            ...c,
                            name : e.target.value
                        }))
                    }} />: null}
                    <LabelledInput label="Username" placeholder="xyz@gmail.com ..." onChange={(e) => {
                        setPostInputs((c) => ({
                            ...c,
                            username : e.target.value
                        }))
                    }} />
                    <LabelledInput label="Password" placeholder="password ..." onChange={(e) => {
                        setPostInputs((c) => ({
                            ...c,
                            password : e.target.value
                        }))
                    }} />
                </div>
                <div className="w-full mt-6">
                    <button onClick={sendRequest} type="button" className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type === "signup" ? "Sign Up": "Sign In"}</button>
                </div>
            </div>
        </div>
    );
};


interface LabelledInputType{
    label : string,
    placeholder : string,
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void
}
function LabelledInput({label, placeholder, onChange} : LabelledInputType) {
    return <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{label}</label>
            <input type="text" onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
        
}