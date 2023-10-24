class ProductsRepository {
    constructor(dao){
        this.dao = dao
    }

    async findAll() {
        try {
            return this.dao.findAll(limit, page, cort, category)
        } catch (error) {
            throw error
        }
    }

    async findOne(id) {
        try {
            return this.dao.findOne(id)
        } catch (error) {
            throw error
        }
    }

    async insertOne(newProductData) {
        try {
            return this.dao.insertOne(newProductData)
        } catch (error) {
            throw error
        }
    }
}

modules.exports = ProductsRepository