const { Router } = require("express")
const fs = require("fs")

const router = Router()

//VARIABLES PARA NO HARDCODEAR DATOS

const cartFilePath = process.cwd() + "/Files/carts.json";

const parseCart = async () => { //fs para obtener los carritos de carts.json
    try {
        const data = await fs.promises.readFile(cartFilePath, "utf-8");  
        const cartList = JSON.parse(data);

        return cartList
    } catch (error) {
        console.log(error);
    }
};

const updateCartFile = async (arr) =>{ //fs para actualizar archivo carts.json
    try{
        await fs.promises.readFile(cartFilePath, "utf-8")
        await fs.promises.writeFile(cartFilePath, JSON.stringify(arr))
    }catch(error){
        console.log(error)
    }
}

router.get("/:cid", async (req, res) => {
    const cartJSON = await parseCart();
    const { cid } = req.params

    const cart = cartJSON.find(cart => cart.id === Number(cid))

    try {
        if(!cart){
            res.json( { message: "Cart not found" } )
        }else{
            const products = cart.products;
            res.json( { massage: products } )
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    const { quantity } = req.body;
    const { cid, pid } = req.params;
    const cartJSON = await parseCart();

    const numberPid = Number(pid)
    const numberCid = Number(cid)

    const prodInfo = {
        id: numberPid,
        quantity
    }

    const cartIndex = cartJSON.findIndex(cart => cart.id === numberCid);
    const cart = cartJSON[cartIndex];

    try{
        if (!cart) {
            res.json({ message: "Cart not found" });
        } else {
            const prodIndex = cart.products.findIndex(product => product.id === numberPid);

            if (prodIndex === -1) {
                cart.products.push(prodInfo);
            } else {
                cart.products[prodIndex].quantity += quantity;
            }
    
            cartJSON[cartIndex] = cart;
            updateCartFile(cartJSON);
    
            res.json({ message: cartJSON });
        }
    }catch (error) {
        console.log(error);
    }
})
    

module.exports = router