const fs = require("fs")

class ProductsFsDao {
    async find(path) {
        try {
            const data = await fs.promises.readFile(path, "utf-8");  
            const products = JSON.parse(data);
            const productList = products.filter(prod => prod.status === true)
            
            return productList
        } catch (error) {
            console.log(error);
        }
    }
 
    async post(arr, path) {
        try{
            await fs.promises.readFile(path, "utf-8")
            await fs.promises.writeFile(path, JSON.stringify(arr))
            
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = ProductsFsDao

