const { userOrder } = require("../../db");

async function orderHistory(req,res){
    
        const orderHistory = await userOrder.find({'order.status' : 'Pending'});

        const statusOrders = orderHistory.map((order ) => {
            const filtered = order.order.filter((order) => order.status === 'Pending')

            return({
                username : order.username,
                order : filtered
            })
        })
    
        res.json({
            msg : "Order Found",
            order : statusOrders
        })
    
}

module.exports = orderHistory;