const Carts = require("../models/carts.js")
 
class CartsMongoDao {
    async find() {
        return await Carts.find({ status: true }, { __v: 0, status: 0})
    } 

    async findOne(cid) {
        return await Carts.findOne({_id: cid, status: true }, { __v: 0, status: 0})
    }
  
    async insertOne(newCart) {
        return await Carts.create(newCart)
    }  

    async updateOne(cid, body) {
        return await Carts.updateOne({_id: cid}, body)
    }

    async updateQuantity(cid, pid, quantity) {
        return await Carts.updateOne(
            { _id: cid, "products.product": pid},
            { $set: {"products.$.quantity": quantity}}
        )
    }

    async deleteOne(cid) {
        return await Carts.updateOne({_id: cid}, {status: false})
    }

    async deleteProduct(cid, pid) {
        return await Carts.updateOne(
            { _id: cid }, 
            { $pull: { products: { _id: pid } }},
            { safe: true, multi: false }
        )
    }
}

module.exports = CartsMongoDao