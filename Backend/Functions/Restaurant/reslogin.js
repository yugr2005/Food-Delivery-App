const { restaurant } = require("../../db");
const genJwt = require("../Middlewares/genJwt");

async function reslogin(req,res){

    const data = req.body;
    
    const find = await restaurant.findOne({username : data.username});

    if(!find){
        res.status(404).json({
            msg : "Restaurant not found"
        })
        return;
    }

    const token = genJwt(data);

    res.json({
        msg : "Restaurant logged-in",
        token : token
    })
}

module.exports = reslogin;