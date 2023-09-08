const fs = require("fs")

class CartsFsDao {
    async find(path){
        try {
            const data = await fs.promises.readFile(path, "utf-8");
            const carts = JSON.parse(data);

            return carts
        } catch (error) {
            console.log(error)
        }
    }

    async postOne(cart, path){
        try{
            await fs.promises.readFile(path, "utf-8")
            await fs.promises.writeFile(path, JSON.stringify(cart))
        }catch(error){
            console.log(error)
        }
    }
} 

module.exports = CartsFsDao