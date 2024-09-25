import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export function Navbar({setSearch, handleSearch}) {


    
    return (
        <div className="flex justify-between h-16 w-full border-b-2 items-center bg-white text-white">
            {/* Brand logo */}
            <h1 className="ml-8 text-5xl text-red-600 font-bold cursor-pointer">Zomato</h1>
            
            {/* Search bar */}
            <div className="relative">
                <input
                    className="w-96 h-10 px-4 rounded-lg text-gray-800 border-2 border-gray-300 hover:shadow-lg transition duration-300 ease-in-out"
                    type="text"
                    placeholder="Search for restaurants..."
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
                <FaSearch className="absolute top-2 right-4 text-gray-500" onClick={handleSearch}/>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-6 mr-8">
                <button className="px-4 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition duration-300 ease-in-out">
                    Sign up
                </button>
                <button className="px-4 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition duration-300 ease-in-out">
                    Login
                </button>
            </div>
        </div>
    );
}
