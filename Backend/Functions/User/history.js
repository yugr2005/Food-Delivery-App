const { userOrder } = require("../../db");

async function history(req,res){

    const user = req.username;

    const orderHistory = await userOrder.find({username : user ,'order.status' : 'Completed'});

    const statusOrders = orderHistory.map((order ) => {
        const filtered = order.order.filter((order) => order.status === 'Completed')

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

module.exports = history;