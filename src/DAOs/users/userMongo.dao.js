const Users = require("../models/users")

class UsersMongoDao {
    async findAll() {
        return await Users.find({status: true}, {status: 0, __v: 0})
    }

    async findOne(email) {
        return await Users.findOne({email: email}, {status: 0, __v:0}, {status:true})
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