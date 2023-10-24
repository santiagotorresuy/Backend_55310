const ProductsRepository = require("./products.repository")

const ProductsDAO = require("../DAOs/factory")


const Products = new ProductsRepository(new ProductsDAO)

module.exports = Products