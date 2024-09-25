const { restaurant } = require("../../db");
const { safeRes } = require("../../types");
const genJwt = require("../Middlewares/genJwt");

async function register(req,res){

    const data = req.body;
    const safeData = safeRes.safeParse(data);

    if(safeData.success){
        res.status(411).json({
            msg : "Invalid inputs"
        })
        return;
    }

    await restaurant.create({
        username : data.username,
        address : data.address,
        phone : data.phone,
        image : data.image,
        category : data.category,
        menu : []

    })

    const token = genJwt(data);

    res.json({
        msg : "Restaurant created",
        token : token
    })


}

module.exports = register;