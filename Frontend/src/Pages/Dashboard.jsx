import axios from "axios";
import { Navbar } from "../Components/Navbar";
import { useEffect, useState } from "react";
import { RestroCard } from "../Components/RestroCard";

export function Dashboard(){

    const[data, setData] = useState([]);

    const getRestro = async () => {
        await axios.get('http://localhost:3040/user/getRestro', {
            headers : {
                Authorization : `${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            console.log(res.data);
            setData(res.data.restaurants);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getRestro();
    }, [])

    return(
        <div>
            <Navbar/>

            {data.map((restro, index) => (<RestroCard key={index} data={restro}/>))}

        </div>
    )
}