const UsersMongoDao = require("../DAOs/mongo/users-mongo.dao")
// const UsersFsDao = require("../DAOs/fs/users-fs.dao")

const Users = new UsersMongoDao
// const Users = new UsersFsDao

const findAll = async () => {
    try {
        return Users.findAll()
    } catch (error) {
        throw error
    }
}

const findOne = async (key, value) => {
    return await Users.findOne(key, value)
}

const insertOne = async newUserData => {
    const newUser = await Users.insertOne(newUserData) 
    return newUser
}

const updateOne = async (id, body) => {
    return await Users.updateOne(id, body)
}

const deleteOne = async id => {
    return await Users.deleteOne(id)
}

module.exports = {
    findAll,
    findOne,
    insertOne,
    updateOne,
    deleteOne,
}