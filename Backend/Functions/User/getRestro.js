const { restaurant } = require("../../db");

async function getRestro(req,res){

    const restaurants = await restaurant.find({});

    if(!restaurants){
        res.status(404).json({
            msg : "No Restaurants found"
        })
        return;
    }

    res.json({
        msg : "Found",
        restaurants : restaurants,
    })


}

module.exports = getRestro;