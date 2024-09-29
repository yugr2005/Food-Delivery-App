import axios from "axios"
import { useEffect, useState } from "react"
import { OrderCard } from "../Components/PendingOrderCard";
// import { PendingOrderCard } from "../Components/PendingOrderCard";

export function AdminStatusChange(){

    const[data, setData] = useState([]);

    const pendingOrders = async() => {
        const response = await axios.get('https://backend-g24oxukfs-yug-patels-projects-fdb0c28e.vercel.app/user/admin/orderHistory', {
            headers : {
                Authorization : `${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            console.log(res.data.order);
            setData(res.data.order);
        })
    }

    useEffect(() => {
        pendingOrders()
    },[])

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Pending Orders</h1>
            <div className="order-list">
                {data.map((userOrder, index) => (
                    <OrderCard key={index} username={userOrder.username} orders={userOrder.order} />
                ))}
            </div>
        </div>
    );
}