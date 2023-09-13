const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const cartCollection = "cart"

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                },
                quantity: Number
            },
        ],  
    },
    subTotal:{
        type: Number,
        default: 0, 
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: Date
})

cartSchema.pre("find", function() {
    this.populate("products.product")
})

cartSchema.pre("findOne", function() {
    this.populate("products.product")
})

cartSchema.plugin(mongoosePaginate)

const Carts = mongoose.model(cartCollection, cartSchema)

module.exports = Carts