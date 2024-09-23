const jwt = require("jsonwebtoken");

function genJwt(person) {

    return jwt.sign({ username : person.username}, process.env.JWT_PASS)
}

module.exports = genJwt;