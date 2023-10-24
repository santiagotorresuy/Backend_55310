const ProductsMongoDao = require("../../DAOs/mongo/products-mongo.dao")
// const ProductsFsDao = require("../../DAOs/fs/products-fs.dao")

// const Products = require("../repositories/index")

const Products = new ProductsMongoDao()
// const Products = new ProductsFsDao()

const findAll = async (limit, page, sort, category) => {
    try {
        return Products.findAll(limit, page, sort, category)
    } catch (error) {
        throw error
    }
}

const findOne = async id => {
    try {
        return Products.findOne(id) 
    } catch (error) {
        throw error
    }
}

const insertOne = async newProductData => {
    try {
        return Products.insertOne(newProductData)
    } catch (error) {
        throw error
    }
}

const updateOne = async (id, body) => {
    try {
        return Products.updateOne(id, body)
    } catch (error) {
        throw error
    }
}

const deleteOne = async id => {
    try {
        return Products.updateOne(id)
    } catch (error) {
        throw error
    }
}

module.exports = {
    findAll,
    findOne,
    insertOne,
    updateOne,
    deleteOne,
}