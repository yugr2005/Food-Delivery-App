import { useState } from "react";
import { Inputbox } from "../Components/Inputbox";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function RestroSignupPage() {
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    async function handleSignup() {
        await axios.post('https://backend-g24oxukfs-yug-patels-projects-fdb0c28e.vercel.app/user/register', {
            username: username,
            address: address,
            phone: phone
        })
        .then((res) => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            alert(res.data.msg);
            navigate("/restroaddmenu");
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-1 text-black">Create an Restaurant account</h2>
                <p className="text-center text-gray-500 mb-6">Enter your details below to create your account</p>

                {/* Username Input */}
                <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant's Name</label>
                    <Inputbox
                        type="text"
                        placeholder="Name of Restaurant"
                        value={username}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Email Input */}
                <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <Inputbox
                        type="text"
                        placeholder="Address"
                        value={address}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {/* Password Input with Eye Icon */}
                <div className="relative mb-6 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                    <Inputbox
                        type="text"
                        placeholder="Phone number"
                        value={phone}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                {/* Sign Up Button */}
                <button onClick={handleSignup} className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300">
                    Sign up
                </button>

                {/* Link to Login Page */}
                <p className="text-center mt-4 text-gray-500">
                    Already have an account? <Link to="/restrologin" className="text-blue-600 hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}
