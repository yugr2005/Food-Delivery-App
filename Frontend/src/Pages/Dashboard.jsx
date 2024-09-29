import axios from "axios";
import { Navbar } from "../Components/Navbar";
import { useEffect, useState } from "react";
import { RestroCard } from "../Components/RestroCard";

export function Dashboard() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearch = async () => {
        const response = await axios.post('https://backend-livid-phi.vercel.app/user/cityRestro', { city: search }, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            console.log(res.data);
            setData(res.data.restaurants);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div>
            <Navbar handleSearch={handleSearch} setSearch={setSearch} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {data.map((restro, index) => (
                    <RestroCard key={index} data={restro} />
                ))}
            </div>
        </div>
    );
}
