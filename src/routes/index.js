const productController = require("../products/controller.product.js")
const cartController = require("../cart/controller.cart.js")
const userController = require("../users/controller.users.js")
// const HTTP_STATUS_CODE = require("../contants/error.constants.js")

const router = app => {
    app.use("/api/products", productController)
    app.use("/api/cart", cartController)
    app.use("/api/users", userController)
    // app.use("*", (req, res) =>{
    //     res.status(HTTP_STATUS_CODE.NOT_FOUND).render("not_found")
    // })
}

module.exports = router