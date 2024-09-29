import { useState } from "react";
import { Inputbox } from "../Components/Inputbox";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function Signuppage() {
    const [showPass, setShowPass] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [pass, setPass] = useState("");

    const navigate = useNavigate();

    async function handleSignup() {
        await axios.post('https://backend-g24oxukfs-yug-patels-projects-fdb0c28e.vercel.app/user/signup', {
            username: username,
            email: email,
            address : address,
            password: pass
        })
        .then((res) => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('cart', JSON.stringify([]));
            alert(res.data.msg);
            navigate("/dashboard");
        })
        .catch((err) => {
            console.log(err);
            alert(err);
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:p-10">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md md:max-w-lg">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-1 text-black">Create an account</h2>
                <p className="text-center text-gray-500 mb-4 md:mb-6">Enter your details below to create your account</p>

                {/* Username Input */}
                <div className="mb-3 md:mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <Inputbox
                        type="text"
                        placeholder="Username"
                        value={username}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-md bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Email Input */}
                <div className="mb-3 md:mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Inputbox
                        type="text"
                        placeholder="Email"
                        value={email}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-md bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Address Input */}
                <div className="mb-3 md:mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <Inputbox
                        type="text"
                        placeholder="Address"
                        value={address}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-md bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {/* Password Input with Eye Icon */}
                <div className="relative mb-4 md:mb-6 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <Inputbox
                        type={showPass ? "text" : "password"}
                        placeholder="Password"
                        value={pass}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-md bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <FaEye
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-9 md:top-10 transform cursor-pointer text-gray-500 text-xl"
                    />
                </div>

                {/* Sign Up Button */}
                <button onClick={handleSignup} className="w-full bg-black text-white py-2 md:py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300">
                    Sign up
                </button>

                {/* Link to Login Page */}
                <p className="text-center mt-4 text-gray-500">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
}
