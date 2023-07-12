class ProductManager {
    #id = 0;
    #products = [];

    constructor(products){
       this.#products = products;
    }

    getProducts() {
        return this.#products;
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const productByCode = this.#products.find(prod => prod.code === code)
        
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
            this.#products.push(newProduct);
        }

    }

    getProductById(idProduct){
        const productById = this.#products.find(prod => prod.id === idProduct)

        if(productById){
            console.log(this.#products[productById])
        }else{
            console.log("Not found")
        }
    }
}

const productManager = new ProductManager();

console.log(productManager.getProducts());
//productManager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);
//console.log(productManager.getProducts())

