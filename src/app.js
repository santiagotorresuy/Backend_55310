const fs = require("fs")
const express = require("express"); 



//TERCERA PRE-ENTREGA

const port = 8080;
const app = express();

//Como este bloque de codigo se repite hago una funcion aparte para hacerlo mas prolijo 

const parseProducts = async () =>{
    const data = await fs.promises.readFile("./Files/products.json", "utf-8");
    return JSON.parse(data)
}

//MIDDLEWARE
//Como javascript no sabe trabajar con archivos json, necesitamos un middleware para que de cierta manera, todo lo que llegue como request pase por algun proceso a mi eleccion, en este caso transformar todo lo que me llega en un objeto de javascript

app.use(express.json());

app.post("/products", async (req, res) => {
    const prodList = await parseProducts();
    const { id, title, description, price, thumbnail, code, stock } = req.body

    const prodInfo ={
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }
    prodList.push(prodInfo)

    //await fs.promises.writeFile("./Files/products.json", prodInfo)??
    res.json({ message: "Producto creado" })
})

app.get("/products", async (req, res) =>{
    const data = await fs.promises.readFile("./Files/products.json", "utf-8");
    const products = JSON.parse(data)
    const { limit } = req.query;

    try {
        const limitFilter = products.slice(0, limit || products.length)

        limitFilter ? res.json( { message: limitFilter } ) : res.json({ message: products })
    } catch (error) {
        console.log(error);
    }
})

app.get("/products/:id", async (req, res) => {
    const data = await fs.promises.readFile("./Files/products.json", "utf-8");
    const products = JSON.parse(data)
    const { id } = req.params

    const idFilter = products.filter(prod => prod.id === Number(id))

    try {
        idFilter ? res.json( { message: idFilter } ) : res.json( { massage: products } )
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () =>{
    console.log(`Running at port ${port}`)
})