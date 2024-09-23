const { food, restaurant } = require("../../db");

async function getMenu(req,res){

    const id = req.params.id;

    const restaurants = await food.find({restaurant : id});

    if(!restaurants){
        res.status(404).json({
            msg : "No Restaurants found"
        })
        return;
    }

    res.json({
        msg : "Found",
        restaurants,
        
    })


}

module.exports = getMenu;