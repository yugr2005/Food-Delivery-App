const { food, userOrder, restaurant } = require("../../db");

async function createorder(req,res){

    const {order} = req.body;
    const id = req.params.id;
    const user = req.username;

    let price = 0;
    let orderitems = [];

    const findRes = await restaurant.findOne({_id : id});

    for(const item of order){

        const fooditem = await food.findOne({nameitem : item.fooditem, restaurant : id});
        console.log(fooditem);

        if(!fooditem){
            res.status(404).json({
                msg : "No item found"
            })
            return;
        }

        price = price + (fooditem.price * item.quantity);

        orderitems.push({
            fooditem : fooditem.nameitem,
            quantity : item.quantity 
        })
    }

    const newOrder = {
        restaurant : findRes.username,
        items : orderitems,
        price : price,
        status : "Pending"
    }

    console.log(findRes.username);
    await userOrder.updateOne({username : user} ,{$push : {order : newOrder}});


    res.json({
        msg : "Order created successfully",
        order : newOrder
    })

}

module.exports = createorder;