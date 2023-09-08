const mongoose = require("mongoose")

const usersCollection = "users"

const usersSchema = new mongoose.Schema({
    name: String,
    lasname: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    status: { 
        type: Boolean,
        default: true
    },
    cart: {
        type: [
            {
                cart:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "cart",
                }
            }
        ],
        default: [],
    }
})

const Users = mongoose.model(usersCollection, usersSchema)

module.exports = Users   