const { userOrder, admin } = require("../../db");

async function orderStatus(req, res) {
    const { id, status } = req.body; // Destructure status and id from request body
    const username = req.username; 

    const findadmin = await admin.findOne({ username: username }); // Corrected method name

    if (!findadmin) {
        return res.status(411).json({ // Added return to prevent further execution
            msg: "Admins only"
        });
    }

    try {
        const update = await userOrder.updateOne(
            { 'order._id': id }, 
            { $set: { 'order.$.status': status } }
        );

        if (update.nModified === 0) {
            return res.status(404).json({
                msg: "Order not found or status not updated"
            });
        }

        res.json({
            msg: "Status updated",
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({
            msg: "Internal Server Error",
            error: error.message, // Optional: Send error message for debugging
        });
    }
}

module.exports = orderStatus;
