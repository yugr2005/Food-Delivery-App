const { restaurant } = require("../../db");

async function cityRestro(req,res){
    
    const city = req.body;

    const restaurants = await restaurant.find({address : {$regex : city.city}});

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
async function getRestro(req,res){


    const restaurants = await restaurant.find({});

    if(!restaurants){
        res.status(404).json({
            msg : "Restaurant not found"
        })
        return;
    }

    res.json({
        msg : "Restaurants found",
        restaurants : restaurants
    })
}

module.exports = {
    getRestro,
    cityRestro,
}
