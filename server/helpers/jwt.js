var jwt = require('jsonwebtoken');

function sign(data) {
    return jwt.sign(data, process.env.SECRET_JWT);
}

function verify(data) {
    console.log(jwt.verify(data, process.env.SECRET_JWT));
    return jwt.verify(data, process.env.SECRET_JWT);
}

module.exports = {sign, verify}