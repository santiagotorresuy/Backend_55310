const { Router } = require("express")
const fs = require("fs")

const router = Router()

//VARIABLES PARA NO HARDCODEAR DATOS

const productsFilePath = process.cwd() + "/Files/products.json";

const parseProducts = async () => { //fs para obtener los productos product.json
    try {
        const data = await fs.promises.readFile(productsFilePath, "utf-8");  
        const productList = JSON.parse(data);

        return productList
    } catch (error) {
        console.log(error);
    }
};

const updateProductsFile = async (arr) =>{ //fs para actualizar archivo products.json
    try{
        await fs.promises.readFile(productsFilePath, "utf-8")
        await fs.promises.writeFile(productsFilePath, JSON.stringify(arr))
    }catch(error){
        console.log(error)
    }
}

//ROUTER
router.get("/", async (req, res) =>{
    const productsJSON = await parseProducts();
    const { limit } = req.query;

    try {
        const slicedProducts = productsJSON.slice(0, limit || 5)
        const status = true;

        if(!limit){
            res.render("home", {
                style: "products",
                status,
                product: productsJSON,
            })        
        }else{
            res.render("home", {
                style: "products",
                status,
                product: slicedProducts,
            })  
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/:pid", async (req, res) => {
    const productsJSON = await parseProducts();
    const { pid } = req.params

    const filteredProduct = productsJSON.filter(prod => prod.id === Number(pid))
    const status = true;

    try {
        if(!filteredProduct){
            res.render("home", {
                style: "products",
                status,
                product: productsJSON,
            }) 
        }else{
            res.render("home", {
                style: "products",
                status,
                product: filteredProduct,
            })  
        }
    } catch (error) {
        console.log(error)
    }
})    

router.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, category, stock } = req.body;
    const productsJSON = await parseProducts();
    let prodId = productsJSON.length;
    prodId++

    const prodInfo = {
        id: prodId, 
        title,
        description,
        price,
        thumbnail,
        code,
        category,
        stock,
        status: true
    };

    const productByCode = productsJSON.find(prod => prod.code === code)

    if(productByCode){
        res.json({ message: "El producto ya existe" });
    }else{
        const status = true;

        productsJSON.push(prodInfo);
        updateProductsFile(productsJSON)

        res.render("home", {
            style: "products",
            status,
            product: productsJSON,
        }) 
    }
})

router.put("/:pid", async (req, res) =>{
    const { pid } = req.params;
    const { description } = req.body;

    const productsJSON = await parseProducts();
    const filteredProduct = productsJSON.find(p => p.id === Number(pid))

    try {
        if(!filteredProduct){
            res.json({ message:"El producto no existe" })
        }else{
            filteredProduct.description = description 
            updateProductsFile(productsJSON)

            res.json({ message: filteredProduct })
        }
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:pid", async (req, res) =>{
    const productsJSON = await parseProducts();
    const { pid } = req.params
    const prodIndex = productsJSON.findIndex(prod => prod.id === Number(pid))

    try {
        if(prodIndex){
            productsJSON.splice(prodIndex, 1);
            updateProductsFile(productsJSON)
            res.json({ message: productsJSON });
        }else{
            res.json({ message: "product not found"}) 
        }              
    } catch (error) {
        console.log(error)
    }      
})

module.exports = router 
