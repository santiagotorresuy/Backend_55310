const { Router } = require("express")
const router = Router() 

const ProductsMongoDao = require("../../DAOs/products/productsMongo.dao")
const ProductsFsDao = require("../../DAOs/products/productsFs.dao")

const ProductsMongo = new ProductsMongoDao()
const ProductsFs = new ProductsFsDao()

const productsFilePath = process.cwd() + "/Files/products.json";
 
router.get("/", async (req, res) =>{
    try {
        const status = true;
        const { limit , page , sort, category } = req.query

        //TRAIGO DE MONGO, HAGO POST CON FS 
        const allProducts = await ProductsMongo.find(limit, page, sort)
        const products = allProducts.filter(prod => prod.category === category)

        await ProductsFs.post(category ? products : allProducts, productsFilePath)
        
        // BUSCO CON FS PARA PODER USAR HANDLEBARS
        const prods = await ProductsFs.find(productsFilePath)

        res.render("products", {
            style: "products",
            status,
            product: prods,
        })    

        // res.json( { message: allProducts })
    } catch (error) {
        res.json({ status: error, message: error});
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const status = true;
        const { pid } = req.params

        const product = await ProductsMongo.findOne(pid); 
        const allProducts = await ProductsFs.find(productsFilePath)  

        if(!product){
            res.render("products", {
                style: "products",
                status,
                product: allProducts,
            }) 
        }else{
            const filteredProduct = allProducts.filter(prod => prod._id === pid)

            res.render("products", {
                style: "products",
                status,
                product: filteredProduct,
            })  
        }
    } catch (error) {
        res.json({ status: error, message: error});
    }
})    

router.post("/", async (req, res) => {  
    const { title, description, price, thumbnail, code, category, stock } = req.body;
    const products = await ProductsFs.find(productsFilePath);

    const prodInfo = {
        title,
        description,
        price,
        thumbnail,
        code,
        category,
        stock,
    };

    const productByCode = products.find(prod => prod.code === code)
    
    if(productByCode){
        res.json({ message: "El producto ya existe" });
    }else{
        const status = true;

        const prod = await ProductsMongo.insertOne(prodInfo)
        products.push(prod);
        
        await ProductsFs.post(products, productsFilePath)
    
        res.render("products", {
            style: "products",
            status,
            product: products,
        }) 
    }
})

router.put("/:pid", async (req, res) =>{
     
    try {
        const { pid } = req.params;
    
        const product = await ProductsMongo.find({_id: pid});

        if(!product){
            res.json({ message:"Product does not exist" })
        }else{
            await ProductsMongo.updateOne(pid, req.body)
            const updatedProduct = await ProductsMongo.find({_id: pid})

            await ProductsFs.post(updatedProduct, productsFilePath)

            res.json({ message: updatedProduct })
        }
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:pid", async (req, res) =>{

    try {
        const { pid } = req.params
        const prodForDelete = await ProductsMongo.find({_id: pid})

        if(!prodForDelete){
            res.json({ message: "El producto no existe"}) 
        }else{
            await ProductsMongo.deleteOne({_id: pid})

            const deletedProduct = await ProductsMongo.find({_id: pid})
            console.log(deletedProduct)

            await ProductsFs.post(deletedProduct, productsFilePath)

            res.json({ message: deletedProduct });
        }              
    } catch (error) {
        console.log(error)
    }      
})

module.exports = router 
