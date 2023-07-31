const { Router } = require("express")
const fs = require("fs")

const router = Router()
const cartFilePath = process.cwd() + "/Files/cart.json";

const parseCart = async () => {
    try {
        const data = await fs.promises.readFile(cartFilePath, "utf-8");  
        return console.log(data)

        // return productList
    } catch (error) {
        console.log(error);
    }
};

parseCart() //AQUI MUESTRA QUE LOS PRODUCTOS LLEGAN DEL JSON PERO NO FUNCIONA EN POSTMAN

router.get("/", async (req, res) =>{
    const cartJSON = await parseCart();
    const { limit } = req.query;

    try {
        const limitFilter = cartJSON.slice(0, limit || 5)
        limitFilter 
            ? res.json( { message: limitFilter } ) 
            : res.json({ message: cartJSON })
    } catch (error) {
        console.log(error);
    }
});

router.get("/:cid", async (req, res) => {
    const cartJSON = await parseCart();
    const { cid } = req.params

    const idFilter = cartJSON.filter(prod => prod.id === Number(cid))

    try {
        idFilter 
            ? res.json( { message: idFilter } ) 
            : res.json( { massage: cartJSON } )
    } catch (error) {
        console.log(error)
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body
    const cartJSON = await parseCart();
    
  
    const prodInfo = {
        id: "test", 
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status: true
    };
    const productByCode = cartJSON.find(prod => prod.code === code)

    if(productByCode){
        res.json({ message: "El producto ya existe" });
    }else{
        productsJSON.push(prodInfo);
        const cartStringify = JSON.stringify(cartJSON);

        await fs.promises.writeFile(productsFilePath, cartStringify);
        res.json({ message: "Producto creado" });
    }
})

router.put("/:pid", async (req, res) =>{
    const { title, prop } = req.params;
    const { value } = req.body;

    console.log("Title:", title);
    console.log("Prop:", prop);
    console.log("Value:", value); //ESTO APARECE UNDEFINED NO SE PORQUE

    const cartJSON = await parseCart();
    const filteredProduct = cartJSON.find(p => p.title === title)

    try {
        if(!filteredProduct){
            res.json({ message:"El producto no existe" })
        }else{
            filteredProduct[prop]= value
            res.json({ message: filteredProduct })
        }
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:pid", async (req, res) =>{
    const { title } = req.params
    const cartJSON = await parseCart();
    const prodIndex = cartJSON.findIndex(prod => prod.title === title)
            
    try {
        cartJSON.splice(prodIndex, 1)
        res.json({ message: cartJSON })              
    } catch (error) {
        console.log(error)
    }      
})
    

module.exports = router