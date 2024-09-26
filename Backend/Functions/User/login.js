const { user } = require("../../db");
const genJwt = require("../Middlewares/genJwt");

async function login(req,res){

    const person = req.body;

    const find = await user.findOne({username : person.username});

    if(!find){
        res.status(404).json({
            msg : "User not found"
        })
        return;
    }

    const validPassword = await bcrypt.compare(person.password, find.password);

    if (!validPassword) {
        res.status(401).json({
            msg: "Invalid credentials"
        });
        return;
    }

    const token = genJwt(person);

    res.json({
        msg : "Logged-in",
        token : token
    })
}

module.exports = login;