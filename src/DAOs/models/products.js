const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
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

productsSchema.plugin(mongoosePaginate)

const Products = mongoose.model(productsCollection, productsSchema)

module.exports = Products