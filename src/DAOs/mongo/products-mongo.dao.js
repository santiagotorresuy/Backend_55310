    const Products = require("../models/products.js")
    
    class ProductsMongoDao {
        async findAll(limit, page, sort, category) {
            
            const query = { 
                status: true,
            }

            const options = {  
                page: page || 1,
                limit: limit || 9,
                category: category,
                sort: { price: sort === 'asc' ? -1 : 1 },
                __v: 0,
            };

            const allProducts = await Products.paginate(query , options);
            const products = allProducts.docs
            
            return products;
        }

        async findOne(id) {
            const products = await Products.paginate({_id: id, status: true});
            return products
        }
    
        async insertOne(newProductData) {
            const newProduct = await Products.create(newProductData)
            return newProduct
        }

        async updateOne(id, body) {
            return await Products.updateOne({_id: id}, body)
        }

        async deleteOne(id) {
            return await Products.updateOne({_id: id}, {status: false})
        }
    }

    module.exports = ProductsMongoDao