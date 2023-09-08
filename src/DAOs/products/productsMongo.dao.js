const Products = require("../models/products.js")
 
class ProductsMongoDao {
    async find() {
        return await Products.find({}, {status: true})
    }
 
    async insertOne(newProductData) {
        const newProduct = await Products.create(newProductData)
        return newProduct
    }

    async updateOne(id, body) {
        return await Products.updateOne({_id: id}, body)
    }

    async deleteOne(id) {
        return await Products.updateOne({_id: id}, {status: false})
    }
}

module.exports = ProductsMongoDao