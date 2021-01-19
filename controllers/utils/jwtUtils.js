const jwt = require('jsonwebtoken');

exports.createToken = async (payload) => {
    let token  = await jwt.sign({...payload}, process.env.JWT_KEY,{expiresIn : '360d'});
    return token;
}

exports.verifyToken = async (token) => {
    try {
        let details = await jwt.verify(token, process.env.JWT_KEY);
        return details;
    } catch (error) {
        console.log(error);
        return new Error("JWT_ERROR");
    }
}
