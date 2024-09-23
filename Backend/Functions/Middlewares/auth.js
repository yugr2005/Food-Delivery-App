const jwt = require("jsonwebtoken");

async function auth(req,res,next) {

    const token = req.headers.authorization;
    
    if(!token){
        res.status(401).json({
            msg : "Please log-in"
        })
        return;
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_PASS);
        req.username = decode.username;
        next();
    }
    catch(error){
        res.status(401).json({msg : "Invalid Token"}); 
        return;
    }
    

}

module.exports = auth;