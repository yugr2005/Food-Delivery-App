const { restaurant, food } = require("../../db");
const { safeItem } = require("../../types");

async function additem(req,res){

    const item = req.body;
    const safeitem = safeItem.safeParse(item);
    const username = req.username;

    if(!safeitem.success){
        res.status(411).json({
            msg : "Invalid inputs"
        })
        return;
    }

    const restaurantexists = await restaurant.findOne({username : username});

    if(!restaurantexists){
        res.status(404).json({
            msg : "Restaurant not found"
        })
        return;
    }

    try{
        const Item = await food.create({
            restaurant : restaurantexists._id,
            restroname : restaurantexists.username,
            nameitem : item.nameitem,
            price : item.price,
            image : item.image,
            description : item.description
        })
    
        await restaurant.updateOne({username : username}, {$push : {menu : Item.nameitem}})
    
        res.json({
            msg : "Item added"
        })
    }
    catch(error){
        res.status(411).json({
            msg : error
        })
    }
}

module.exports = additem;