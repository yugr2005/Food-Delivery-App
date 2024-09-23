import { useState } from "react";
import { Inputbox } from "../Components/Inputbox";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function Loginpage() {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);

    const navigate = useNavigate();

    async function handleLogin() {
        await axios.post('http://localhost:3040/user/login', {
            username: username,
            password: pass
        })
        .then((res) => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.serItem('cart', JSON.stringify([]));
            alert(res.data.msg);
            navigate("/dashboard");
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-1 text-black">Login to your account</h2>
                <p className="text-center text-gray-500 mb-6">Enter your credentials below to login</p>

                {/* Username Input */}
                <div className="mb-4 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <Inputbox
                        type="text"
                        placeholder="Username"
                        value={username}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Password Input with Eye Icon */}
                <div className="relative mb-6 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <Inputbox
                        type={showPass ? "text" : "password"}
                        placeholder="Password"
                        value={pass}
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <FaEye
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-10 transform cursor-pointer text-gray-500 text-xl"
                    />
                </div>

                {/* Login Button */}
                <button onClick={handleLogin} className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300">
                    Login
                </button>

                {/* Link to Signup Page */}
                <p className="text-center mt-4 text-gray-500">
                    New user? <Link to="/signup" className="text-blue-600 hover:underline">Sign up here</Link>
                </p>
            </div>
        </div>
    );
}
