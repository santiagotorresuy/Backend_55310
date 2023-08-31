const express = require("express");
const handlebars = require("express-handlebars");

const ProductManager = require("./Classes/ProductManager");
const router = require("./routes/index");
const mongoConnect = require("./db")

//CODIGO
const productManager = new ProductManager();

let testProduct1 = {
    title: "productoPrueba1", 
    description: "este es un producto prueba", 
    price: 100, 
    thumbnail: "sin imagen", 
    code: "abc123", 
    category: "test product",
    stock: 25
}
let testProduct2 = {
    title: "producto prueba 2", 
    description: "este es un producto prueba", 
    price: 200, 
    thumbnail: "sin imagen", 
    code: "abc124", 
    category: "test product",
    stock: 25
}
let testProduct3 = {
    title: "producto prueba 3", 
    description: "este es un producto prueba", 
    price: 300, 
    thumbnail: "sin imagen", 
    code: "abc125", 
    category: "test product",
    stock: 25
}
let testProduct4 = {
    title: "producto prueba 4", 
    description: "este es un producto prueba", 
    price: 400, 
    thumbnail: "sin imagen", 
    code: "abc126", 
    category: "test product",
    stock: 25
}
let testProduct5 = {
    title: "producto prueba 5", 
    description: "este es un producto prueba", 
    price: 500, 
    thumbnail: "sin imagen", 
    code: "abc127", 
    category: "test product",
    stock: 25
}
let testProduct6 = {
    title: "producto prueba 6", 
    description: "este es un producto prueba", 
    price: 600, 
    thumbnail: "sin imagen", 
    code: "abc128", 
    category: "test product",
    stock: 25
}
let testProduct7 = {
    title: "producto prueba 7", 
    description: "este es un producto prueba", 
    price: 700, 
    thumbnail: "sin imagen", 
    code: "abc129", 
    category: "test product",
    stock: 25
}
let testProduct8 = {
    title: "producto prueba 8", 
    description: "este es un producto prueba", 
    price: 800, 
    thumbnail: "sin imagen", 
    code: "abc130", 
    category: "test product",
    stock: 25
}

//PRIMERA PRE-ENTREGA
productManager.addProduct(testProduct1);
productManager.addProduct(testProduct2);
productManager.addProduct(testProduct3);
productManager.addProduct(testProduct4);
productManager.addProduct(testProduct5);
productManager.addProduct(testProduct6);
productManager.addProduct(testProduct7);
productManager.addProduct(testProduct8);

//APP Y MIDDLEWARES
const app = express()

app.use(express.json());
app.use(express.static(__dirname + '/public'))
express.urlencoded({extended:true})

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

mongoConnect()

router(app) 

module.exports = app

 



