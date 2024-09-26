const { user, userOrder } = require("../../db");
const { safeUser } = require("../../types");
const bcrypt = require("bcrypt");
const genJwt = require("../Middlewares/genJwt");

async function signup(req,res){

    const person = req.body;

    const safeperson = safeUser.safeParse(person);

    if(!safeperson.success){
        res.status(411).json({
            msg : "Invalid inputs"
        })
        return;
    }

    const hashed = await bcrypt.hash(person.password, 10);
    
    await user.create({
        username : person.username,
        email : person.email,
        address : person.address,
        password : hashed
    })

    const token = genJwt(person);

    await userOrder.create({
        username : person.username,
        order : []
    })

    res.json({
        msg : "User created",
        token : token
    })

}

module.exports = signup;