import axios from "axios"
import { useEffect, useState } from "react"
import { OrderCard } from "../Components/PendingOrderCard";
// import { PendingOrderCard } from "../Components/PendingOrderCard";

export function AdminStatusChange(){

    const[data, setData] = useState([]);

    const pendingOrders = async() => {
        const response = await axios.get('http://localhost:4444/user/admin/orderHistory', {
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

    // return(
    //     <div>
    //         <h1>Admin Orders Status</h1>

    //         {data.map((item, index) => (<PendingOrderCard key={index} data={item}/>))}
    //     </div>
    // )

    return (
        <div>
            <h1>Orders</h1>
            <div className="order-list">
                {data.map((userOrder, index) => (
                    <OrderCard key={index} username={userOrder.username} orders={userOrder.order} />
                ))}
            </div>
        </div>
    );
}