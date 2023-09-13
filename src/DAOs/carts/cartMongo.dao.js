const Carts = require("../models/carts.js")
 
class CartsMongoDao {
    async find() {
        return await Carts.find({ status: true }, { __v: 0, status: 0})
    } 

    async findOne(id) {
        return await Carts.findOne({_id: id, status: true }, { __v: 0, status: 0})
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

    async deleteProduct(id, pid) {
        return await Carts.updateOne({ _id: id }, { $group: { "products": { "product": !pid } }})
    }
}

module.exports = CartsMongoDao