const productController = require("../products/productController.js")
const cartController = require("../cart/cartController.js")

const router = app => {
    app.use("/api/products", productController)
    app.use("/api/cart", cartController)
}

module.exports = router