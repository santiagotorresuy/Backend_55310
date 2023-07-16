class ProductManager {
    #id = 0;
    
    constructor(products){
        products = [];
        this.products = products;
    }

    getProducts() {
        return console.log(this.products);
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const productByCode = this.products.find(prod => prod.code === code)
        
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
        }

    }

    getProductById(idProduct){
        const productById = this.products.find(prod => prod.id === idProduct)
        console.log(productById)

        if(productById){
            console.log(productById)
        }else{
            console.log("Not found")
        }
    }
}

const productManager = new ProductManager();


productManager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);
//productManager.getProducts()
productManager.getProductById(1)