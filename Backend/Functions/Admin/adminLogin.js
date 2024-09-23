const { admin } = require("../../db");
const genJwt = require("../Middlewares/genJwt");

async function adminLogin(req,res){

    const person = req.body;

    const find = await admin.findOne({username : person.username});

    if(!find){
        res.status(404).json({
            msg : "No admin found"
        })
        return;
    }

    const token = genJwt(person);

    res.json({
        msg : "Admin logged-in",
        token : token,
    })
}

module.exports = adminLogin;