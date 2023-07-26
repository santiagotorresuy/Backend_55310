const fs = require("fs");

class ProductManager {
    
    #id = 0 

    constructor(products, path){
        //products = [];
        //path = "../Files/products.json";

        this.path = path;
        this.products = products;
        
    }

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

    async readFile() {
        try {
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf8');
                const productsFromJSON = JSON.parse(data);
                return productsFromJSON
            }
            return []
        } catch (err) {
            console.log(err);
        }
    }

    async addProduct(product){
        const {title, description, price, thumbnail, code, stock} = product
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
                    stock 
                } 

                this.products.push(newProduct);

                await fs.promises.readFile(this.path, "utf-8")
                const productsJSON = JSON.stringify(this.products, null, 2) 
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
}

//CODIGO
const productManager = new ProductManager([], "./Files/products.json");

let testProduct1 = {
    title: "producto prueba 1", 
    description: "este es un producto prueba", 
    price: 100, 
    thumbnail: "sin imagen", 
    code: "abc123", 
    stock: 25
}
let testProduct2 = {
    title: "producto prueba 2", 
    description: "este es un producto prueba", 
    price: 200, 
    thumbnail: "sin imagen", 
    code: "abc124", 
    stock: 25
}
let testProduct3 = {
    title: "producto prueba 3", 
    description: "este es un producto prueba", 
    price: 300, 
    thumbnail: "sin imagen", 
    code: "abc125", 
    stock: 25
}
let testProduct4 = {
    title: "producto prueba 4", 
    description: "este es un producto prueba", 
    price: 400, 
    thumbnail: "sin imagen", 
    code: "abc126", 
    stock: 25
}
let testProduct5 = {
    title: "producto prueba 5", 
    description: "este es un producto prueba", 
    price: 500, 
    thumbnail: "sin imagen", 
    code: "abc127", 
    stock: 25
}

//PRIMERA PRE-ENTREGA

productManager.addProduct(testProduct1);
productManager.addProduct(testProduct2);
productManager.addProduct(testProduct3);
productManager.addProduct(testProduct4);
productManager.addProduct(testProduct5);

    //productManager.getProductById(3)
    //productManager.getProducts()

//SEGUNDA PRE-ENTREGA

    //productManager.updateProduct(1, "title", "nuevo nombre")
    // productManager.deleteProduct(2)

module.exports = ProductManager

