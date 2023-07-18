const fs = require("fs");

class ProductManager {
    #id = 0;
    
    constructor(products, path){
        products = [];
        path = "../Files/products.json"

        this.path = path;
        this.products = products;
    }

    getProducts() {
        return console.log(this.products);
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
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    
                return newProduct;
            }
        }catch (error){
            console.log(error);
        }
    }

    getProductById(idProduct){
        const productById = this.products.findIndex(prod => prod.id === idProduct);

        if(productById !== -1){
            console.log(this.products[productById])
        }else{
            console.log("Not found")
        }
    }

    async updateProduct(id, property, newValue){
        const product = this.products.find(prod => prod.id === id);
       
        try{
            if(product){
                product[property]= newValue;
                console.log(this.products)
            }else{
                console.log("Not found")
            }
        }catch(error){
            console.log(error)
        }

    }

}

const productManager = new ProductManager();

let testProduct = {
    title: "producto prueba", 
    description: "este es un producto prueba", 
    price: 200, 
    thumbnail: "sin imagen", 
    code: "abc123", 
    stock: 25
}

productManager.addProduct(testProduct);
//productManager.getProductById(1)
productManager.updateProduct(1, "title", "nuevo nombre")