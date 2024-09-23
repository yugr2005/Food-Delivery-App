const { restaurant } = require("../../db");

async function singleRestro(req,res){

    const id = req.params.id;

    const hotel = await restaurant.findOne({_id : id});

    if(!hotel){
        res.status(404).json({
            msg : "No hotels found"
        })
        return;
    }

    res.json({
        msg : "Restaurant Found",
        hotel : hotel
    })

}

module.exports = singleRestro;