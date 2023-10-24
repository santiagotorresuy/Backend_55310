const Users = require("../models/users")

class UsersMongoDao {
    async findAll() {
        return await Users.find({status: true}, {status: 0, __v: 0})
    }

    async findOne(key, value) {
        const query = {}
        query[key] = value
        return await Users.findOne(query, {status: 0, __v:0}, {status:true})
    }
 
    async insertOne(newUserData) {
        const newUser = await Users.create(newUserData) 
        return newUser
    }

    async updateOne(id, body) {
        return await Users.updateOne({_id: id,}, body)
    }

    async deleteOne(id) {
        return await Users.deleteOne({_id: id}, { status: false })
    }

}

module.exports = UsersMongoDao