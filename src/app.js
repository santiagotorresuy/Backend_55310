const ProductManager = require("./Classes/ProductManager")

//CODIGO
const productManager = new ProductManager();

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
//productManager.deleteProduct(2)

//TERCERA PRE-ENTREGA

const port = 8080;
productManager.startServer(port);
productManager.postProduct();



