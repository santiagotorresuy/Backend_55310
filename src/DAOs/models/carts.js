const mongoose = require("mongoose")

const cartCollection = "cart"

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                },
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
    }
})

const Carts = mongoose.model(cartCollection, cartSchema)

module.exports = Carts