const fs = require("fs");
const express = require("express")

class ProductManager {
    
    #id = 0 

    constructor(products, path, app){
        products = [];
        path = process.cwd() + "/Files/products.json";

        this.path = path;
        this.products = products;

        //MIDDLEWARE
        //Como javascript no sabe trabajar con archivos json, necesitamos un middleware para que de cierta manera, todo lo que llegue como request pase por algun proceso a mi eleccion, en este caso transformar todo lo que me llega en un objeto de javascript
        this.app = app;
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

    //Como este bloque de codigo se repite hago una funcion aparte para hacerlo mas prolijo (no funciona)

    // const parseProducts = async () =>{
    //     const data = await fs.promises.readFile("./Files/products.json", "utf-8");
    //     return JSON.parse(data)
    // }

    startServer(port){
        this.app = express();
        this.app.use(express.json());
        this.app.listen(port, () =>{
            console.log(`Running at port ${port}`)
        });

        this.getProductsBack()
    }

    getProductsBack(){
        this.app.get("/products", async (req, res) =>{
            const data = await fs.promises.readFile(this.path, "utf-8");
            const productsJSON = JSON.parse(data)
            const { limit } = req.query;
        
            try {
                const limitFilter = productsJSON.slice(0, limit || productsJSON.length)
                limitFilter ? res.json( { message: limitFilter } ) : res.json({ message: productsJSON })
            } catch (error) {
                console.log(error);
            }
        });

        this.app.get("/products/:id", async (req, res) => {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const productsJSON = JSON.parse(data)
            const { id } = req.params
        
            const idFilter = productsJSON.filter(prod => prod.id === Number(id))
        
            try {
                idFilter ? res.json( { message: idFilter } ) : res.json( { massage: productsJSON } )
            } catch (error) {
                console.log(error)
            }
        })
    }

    postProduct(){
        this.app.post("/products", async (req, res) => {
            const { id, title, description, price, thumbnail, code, stock } = req.body
    
            const prodInfo = {
                id, 
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
    
            try{
                this.products.push(prodInfo)
                await fs.promises.readFile(this.path, "utf-8");
                const productsJSON = JSON.stringify(this.products)
            
                await fs.promises.writeFile(this.path, productsJSON)
                res.json({ message: "Producto creado" })
            }catch(err){
                console.log(err);
            }
        })
    }
}

module.exports = ProductManager

