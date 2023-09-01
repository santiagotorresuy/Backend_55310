const Users = require("../DAOs/models/users")

class UsersMongoDao {
    async findAll() {
        return await Users.find({status: true}, {status: 0, __v: 0})
    }
 
    async insertOne(newUserData) {
        const newUser = await Users.create(newUserData)
        return newUser
    }
}

module.exports = UsersMongoDao