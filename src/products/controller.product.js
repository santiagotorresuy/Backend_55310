const { Router } = require("express")
const router = Router() 

const ProductsMongoDao = require("../DAOs/productsMongo.dao")
const ProductsFsDao = require("../DAOs/productsFs.dao")

const ProductsMongo = new ProductsMongoDao
const ProductsFs = new ProductsFsDao

const productsFilePath = process.cwd() + "/Files/products.json";

//ROUTER
router.get("/", async (req, res) =>{

    try {
        const status = true;
        const { limit } = req.query;

        const products = await ProductsFs.find(productsFilePath);
        const slicedProducts = products.slice(0, limit || 5)

        if(!limit){
            res.render("home", {
                style: "products",
                status,
                product: products,
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

    try {
        const { pid } = req.params
        const status = true;
        
        const allProducts = await ProductsFs.find(productsFilePath)    //tengo que hacerlo con fs porque no se puede handlebars/mongo
        const product = await ProductsMongo.find({_id: pid});          //para confirmar existencia si uso mongo

        if(!product){
            res.render("home", {
                style: "products",
                status,
                product: allProducts,
            }) 
        }else{
            const filteredProduct = allProducts.filter(prod => prod._id === pid)

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
    const products = await ProductsFs.find(productsFilePath);

    const prodInfo = {
        title,
        description,
        price,
        // thumbnail: "Sin imagen",
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
        
        await ProductsFs.postOne(products, productsFilePath)
    
        res.render("home", {
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
            res.json({ message:"El producto no existe" })
        }else{
            await ProductsMongo.updateOne(pid, req.body)
            const updatedProduct = await ProductsMongo.find({_id: pid})

            await ProductsFs.postOne(updatedProduct, productsFilePath)

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

            await ProductsFs.postOne(deletedProduct, productsFilePath)

            res.json({ message: deletedProduct });
        }              
    } catch (error) {
        console.log(error)
    }      
})

module.exports = router 
