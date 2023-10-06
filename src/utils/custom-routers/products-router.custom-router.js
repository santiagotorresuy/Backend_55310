const Router = require("../custom-routers/router.custom-router")

class ProductsRouter extends Router {
    init() {
        this.get("/", (req, res) => {
            res.sendSuccess("All users")
        })

        this.post("/", (req, res) => {
            res.sendSuccessCreated()
        })
    }
}

module.exports = ProductsRouter