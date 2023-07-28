const productController = require("../products/controller.js")

const router = app => {
    app.use("/products", productController)
}

module.exports = router