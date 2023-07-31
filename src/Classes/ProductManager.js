const fs = require("fs");
// const express = require("express")
// const routes = require("../routes/index")

class ProductManager {
    
    #id = 0 

    constructor(products, path){
        products = [];
        path = process.cwd() + "/Files/products.json";

        this.path = path;
        this.products = products;
        // this.app = app;
    }

    //PRIMERA PRE-ENTREGA

    getProducts() {
        return console.log(this.products);
    }

    getProductById(idProduct){
        const productById = this.products.findIndex(prod => prod.id === idProduct);

        if(productById !== -1){
            console.log(this.products[productById])
        }else{
            console.log("Not found")
        }
    }

    //SEGUNDA PRE-ENTREGA

    async readFile() {
        try {
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const productsFromJSON = JSON.parse(data);
                return productsFromJSON
            }
            return []
        } catch (err) {
            console.log(err);
        }
    }

    async addProduct(product){
        const {title, description, price, thumbnail, code, status, category, stock} = product
        const productByCode = this.products.find(prod => prod.code === code)
            
        try{
            if(productByCode){
                console.log("El producto ya existe");
            }else{
                this.#id++
                const newProduct = {
                    id: this.#id,
                    title,
                    description,
                    price,  
                    thumbnail,
                    code,
                    status,
                    category,
                    stock 
                } 
                this.products.push(newProduct);
                
                await fs.promises.readFile(this.path, "utf-8")
                const productsJSON = JSON.stringify(this.products) 
                await fs.promises.writeFile(this.path, productsJSON);
    
                return newProduct;
            }
        }catch (error){
            console.log(error);
        }
    }

    async deleteProduct(id){
        try{
            const newArrayProducts = this.products.filter(product => product.id !== id)
            this.products = newArrayProducts

            fs.promises.writeFile(this.path, JSON.stringify(this.products))

            console.log(this.products)
        }catch(error){
            console.log(error)
        }
    }

    async updateProduct(id, property, newValue){
        const product = this.products.find(prod => prod.id === id);
       
        try{
            if(product){
                product[property]= newValue;
                const productsJSON = JSON.stringify(this.products)
                await fs.promises.writeFile(this.path, productsJSON)
            }else{
                console.log("Not found")
            }
        }catch(error){
            console.log(error)
        }
    }

    //TERCERA PRE-ENTREGA

    // setExpress(port){
    //     this.app = express();
    //     this.app.use(express.json());
    //     express.urlencoded({extended:true})
    //     routes(this.app)
}

module.exports = ProductManager


