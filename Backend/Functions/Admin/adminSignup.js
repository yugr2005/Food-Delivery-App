const { admin } = require("../../db");
const { safeAdmin } = require("../../types");
const genJwt = require("../Middlewares/genJwt");

async function adminSignup(req,res){

    const person = req.body;

    const safeperson = safeAdmin.safeParse(person);

    if(!safeperson.success){
        res.status(411).json({
            msg : "Invalid inputs"
        })
        return;
    }

    await admin.create({
        username : person.username,
        email : person.email,
        password : person.password
    })

    const token = genJwt(person);

    res.json({
        msg : "Admin created",
        token : token,
    })

}

module.exports = adminSignup;