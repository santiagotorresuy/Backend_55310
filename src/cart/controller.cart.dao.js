const { Router } = require("express")
const router = Router()

const CartsMongoDao = require("../DAOs/carts/cartMongo.dao")
const CartsFsDao = require("../DAOs/carts/cartFs.dao")

const CartsMongo = new CartsMongoDao
const CartsFs = new CartsFsDao

const cartFilePath = process.cwd() + "/Files/carts.json";

router.get("/", async (req, res) =>{
    try {
        const carts = await CartsMongo.find()

        res.json({ message: carts })
    } catch (error) {
        console.log(error)
    }
})

router.get("/:cid", async (req, res) => {

    try {
        const { cid } = req.params

        const cart = await CartsMongo.findOne(cid)

        if(!cart){
            res.json( { message: "Cart not found" } )
        }else{
            res.json( { massage: cart } )
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/", async (req, res) => {

    try {
        const { product, subTotal } = req.body

        const newCart = {
            subTotal,
        }

        console.log(product)
        const postedProduct = await CartsMongo.insertOne(newCart)

        await CartsFs.postOne(postedProduct, cartFilePath)
        
        res.json({ message: "Cart created successfully" })
    } catch (error) {
        console.log(error)
    }
})

router.patch("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const { product } = req.body

        const cart = await CartsMongo.findOne(cid)

        if(!cart){
            res.json({ message: "Cart does not exist"})
        }

        cart.products.push({ product })

        await CartsMongo.updateOne(cid, cart)

        const updatedCart = await CartsMongo.findOne(cid)

        await CartsFs.postOne(updatedCart, cartFilePath)

        res.json({ message: updatedCart })
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:cid", async (req, res) =>{
    try {
        const { cid } = req.params

        const cart = await CartsMongo.findOne(cid)

        if(!cart){
            res.json({ message: "Cart not found"})
        }

        await CartsMongo.deleteOne(cid)

        res.json({ message: "Cart deleted successfully"})
    } catch (error) {
        console.log(error)
    }
})
    

module.exports = router