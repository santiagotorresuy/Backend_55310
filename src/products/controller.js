const { Router } = require("express")
const fs = require("fs")

const router = Router()

const parseProducts = async () =>{
    const data = await fs.promises.readFile(process.cwd() + "/Files/products.json", "utf-8");
    productsList = JSON.parse(data)

    return productsList
} 

router.get("/products", async (req, res) =>{
    const productsJSON = await parseProducts();
    console.log(productsJSON)
    const { limit } = req.query;

    try {
        const limitFilter = productsJSON.slice(0, limit || 5)
        limitFilter ? res.json( { message: limitFilter } ) : res.json({ message: productsJSON })
    } catch (error) {
        console.log(error);
    }
});

router.get("/products/:id", async (req, res) => {
    const productsJSON = await parseProducts();
    const { id } = req.params

    const idFilter = productsJSON.filter(prod => prod.id === Number(id))

    try {
        idFilter ? res.json( { message: idFilter } ) : res.json( { massage: productsJSON } )
    } catch (error) {
        console.log(error)
    }
})

router.post("/products", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body
    const productsJSON = await parseProducts();
    

    const prodInfo = {
        id: 99, 
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    };
    const productByCode = productsJSON.find(prod => prod.code === code)

    if(productByCode){
        res.json({ message: "El producto ya existe" });
    }else{
        productsJSON.push(prodInfo);
        const productsStringify = JSON.stringify(productsJSON);

        await fs.promises.writeFile("../Files/products.json", productsStringify);
        res.json({ message: "Producto creado" });
    }
})


module.exports = router