import axios from "axios";

export function OrderCard({ username, orders }) {

    const ChangeStatus = async (e, orderId) => {
        const newStatus = e.target.value;

        try {
            const response = await axios.post('http://localhost:4444/user/admin/orderStatus', {
                id: orderId,
                status: newStatus
            }, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            console.log('Order status updated:', response.data);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="card">
            <h2>{username}</h2>
            {orders.map((order, index) => (
                <div key={index} className="order">
                    {order.restaurant && <h3>Restaurant: {order.restaurant}</h3>}
                    <ul>
                        {order.items.map(item => (
                            <li key={item._id}>
                                {item.fooditem} (Quantity: {item.quantity})
                            </li>
                        ))}
                    </ul>
                    <p>Total Price: ${order.price}</p>

                    <select value={order.status} onChange={(e) => ChangeStatus(e, order._id)}>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
        
                </div>
            ))}
        </div>
    );
}

