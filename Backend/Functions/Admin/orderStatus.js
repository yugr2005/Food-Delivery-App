const { userOrder } = require("../../db");

async function orderStatus(req,res){

    const status = req.body;

    const update = await userOrder.updateOne({'order._id' : status.id}, {$set: {'order.$.status' : status.status}})

    if(update.nModified === 0){
        res.status(404).json({
            msg : "Order not found or status not updated"
        })
        return;
    }

    res.json({
        msg : "Status updated",

    })
}

module.exports = orderStatus;