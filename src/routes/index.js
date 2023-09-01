const productController = require("../products/controller.product.js")
const cartController = require("../cart/controller.cart.js")
const userController = require("../users/controller.users.js")

const router = app => {
    app.use("/api/products", productController)
    app.use("/api/cart", cartController)
    app.use("/api/users", userController)
}

module.exports = router 