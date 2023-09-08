const { Router } = require("express")
const UsersMongoDao = require("../DAOs/users/userMongo.dao")

const Users = new UsersMongoDao

const router = Router()

router.get("/", async (req, res) =>{
    try {  
        const users = await Users.findAll()
        res.json({ message: users })
    } catch (error) {
        res.json({ error })
    }
}) 

router.post("/", async (req, res) =>{
    const {name, lastname, email, age} = req.body;

    const userInfo = {
        name, 
        lastname,
        email,
        age,
    }

    const newUser = await Users.insertOne(userInfo)

    res.json({ message: newUser })
})

router.patch( "/:id", async (req, res) =>{
    try {
        const { id } = req.params

        await Users.updateOne({ _id: id}, req.body)

        res.json({ message: "User uploaded successfully" })
    } catch (error) {
        res.json({ error })
    }
})

router.delete( "/:id", async (req, res) =>{
    try {
        const { id } = req.params

        await Users.updateOne({ _id: id}, {status: false})

        res.json({ message: "User deleted successfully" })
    } catch (error) {
        res.json({ error })
    }
})


module.exports = router