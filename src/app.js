const fs = require("fs")
const express = require("express");


//TERCERA PRE-ENTREGA

const port = 8080;
const app = express();

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