import React from 'react';

export function History({ username, orders }) {
    // Calculate the total spending
    const getTotalSpending = () => {
        let total = 0;
        orders.forEach((order) => {
            total += order.price;
        });
        return total.toFixed(2);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 my-4">
            <h2 className="text-2xl font-bold mb-4">Order History for {username}</h2>
            <p className="text-lg font-semibold">Total Spending: ${getTotalSpending()}</p>
            <div className="mt-4 space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold">{order.restaurant}</h3>
                        <ul className="mt-2">
                            {order.items.map((item) => (
                                <li key={item._id} className="text-gray-800">
                                    {item.fooditem} - Quantity: {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-2 text-gray-700">Price: ${order.price}</p>
                        <p className="text-sm text-gray-500">Status: {order.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
