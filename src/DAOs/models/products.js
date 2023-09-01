const mongoose = require("mongoose")

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: {
        type: String, 
        default: "Sin imagen"   
    },
    code:{
        type: String,
        unique: true
    },
    category: String, 
    stock: Number,
    status: {
        type: Boolean,
        default: true
    }
})

const Products = mongoose.model(productsCollection, productsSchema)

module.exports = Products