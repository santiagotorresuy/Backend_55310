const homeController = require("../home/controller.home.js")
const usersController = require("../users/controller.users.dao.js")
const templateController = require("../templates/controller.templates.js")
const productController = require("../products/controller.product.dao.js")
const createProductController = require("../createProduct/controller.create.product.js")
const cartController = require("../cart/controller.cart.dao.js")
const chatController = require("../chat/controller.chat.js")


const router = app => {
    app.use("/api/home", homeController)
    app.use("/api/users", usersController)
    app.use("/api/templates", templateController)
    app.use("/api/products", productController)
    app.use("/api/createProduct", createProductController)
    app.use("/api/carts", cartController) 
    app.use("/api/chat", chatController)
    app.use("*", (req, res) => {
        res.render("notFound")
    })
}

module.exports = router 