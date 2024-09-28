import React, { useEffect, useState } from "react";
import axios from "axios";
import { History } from "../Components/History";

export function HistoryPage() {
    const [data, setData] = useState([]);

    const handleOrders = async () => {
        try {
            const response = await axios.get("http://localhost:4444/user/history", {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            });
            setData(response.data.order);  // Assuming "order" is the key in the response
        } catch (error) {
            console.error("Error fetching order history:", error);
        }
    };

    useEffect(() => {
        handleOrders();
    }, []);

    return (
        <div className="max-w-screen-lg mx-auto px-4">
            {data.length > 0 ? (
                data.map((userOrder, index) => (
                    <History
                        key={index}
                        username={userOrder.username}
                        orders={userOrder.order}
                    />
                ))
            ) : (
                <p className="text-center text-gray-600">No order history found.</p>
            )}
        </div>
    );
}
