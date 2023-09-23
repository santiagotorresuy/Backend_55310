const jwt = require("jsonwebtoken")
const { jwtConfig } = require("../config/index.config");
const UsersMongoDao = require("../DAOs/users/userMongo.dao");

const secretKey =  jwtConfig.secret
const UsersMongo = new UsersMongoDao()

const generateToken = user => {
    return jwt.sign({ user }, secretKey, { expiresIn: "1000s" })
}

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization  

    if(!authHeader){
        return res.status(401).json({ status: "error", error: "Unauthorized"})
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token, secretKey, (error, credentials) => {
        if(error){
            return res.status(403).json({ status: "error", error: "Forbidden"})
        }

        req.user = UsersMongo.findOne("_id", credentials.user)
        next()
    })
}

module.exports = {
    generateToken,
    authToken
}