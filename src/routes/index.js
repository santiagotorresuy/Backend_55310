const productController = require("../products/controller.product.dao.js")
const cartController = require("../cart/controller.cart.js")
const chatController = require("../chat/controller.chat.js")
const usersController = require("../users/controller.users.dao.js")


const router = app => {
    app.use("/api/products", productController)
    app.use("/api/cart", cartController)
    app.use("/api/chat", chatController)
    app.use("/api/users", usersController)
}

module.exports = router 