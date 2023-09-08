const Carts = require("../models/carts.js")
 
class CartsMongoDao {
    async find() {
        return await Carts.find({}, { __v: 0}, {status: true})
    }

    async findOne(id) {
        return await Carts.findOne({_id: id}, { __v: 0}, {status: true})
    }
 
    async insertOne(newCart) {
        return await Carts.create(newCart)
    } 

    async updateOne(id, body) {
        return await Carts.updateOne({_id: id}, body)
    }

    async deleteOne(id) {
        return await Carts.updateOne({_id: id}, {status: false})
    }
}

module.exports = CartsMongoDao