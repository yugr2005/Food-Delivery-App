import axios from "axios";

export function OrderCard({ username, orders }) {
  const ChangeStatus = async (e, orderId) => {
    const newStatus = e.target.value;

    try {
      const response = await axios.post(
        "https://backend-livid-phi.vercel.app//user/admin/orderStatus",
        {
          id: orderId,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Order status updated:", response.data);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{username}'s Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
          >
            {order.restaurant && (
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Restaurant: {order.restaurant}
              </h3>
            )}
            <ul className="flex-1 mb-4">
              {order.items.map((item) => (
                <li key={item._id} className="text-gray-700">
                  {item.fooditem} (Quantity: {item.quantity})
                </li>
              ))}
            </ul>
            <p className="text-lg font-bold text-gray-800 mb-4">
              Total Price: ${order.price}
            </p>

            <select
              value={order.status}
              onChange={(e) => ChangeStatus(e, order._id)}
              className="mt-2 p-2 border border-gray-300 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
