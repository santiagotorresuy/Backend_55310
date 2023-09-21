const { Router } = require("express")
const UsersMongoDao = require("../DAOs/users/userMongo.dao")
const { getHashedPassword, comparePassword } = require("../utils/bcrypt")
const passport = require("passport")

const Users = new UsersMongoDao

const router = Router()

router.get("/", async (req, res) =>{
    try {  
        const users = await Users.findAll()
        res.json({ message: users })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    } 
}) 
   
router.get("/:uid", async (req, res) =>{
    try {
        const { uid } = req.params

        const user = await Users.findOne(uid)

        res.json( { message: user } )
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
})

router.post("/signUp",
    passport.authenticate("register", { failureRedirect: "/failSignUp"}), 
    async (req, res) =>{
        try {
            res.status(201).json({ status: "success", payload: req.user })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", error: "Internal Server Error" })
        }
})

router.get("/failSignUp", (req, res) => {
    res.json({ status: "error", error: "Failed SignUp"})
})

router.post("/login", 
    passport.authenticate("login", { failureRedirect: "/failLogin"}),
    async (req, res) => {
        try {
            if(!req.user){
                return res.status(400).json({ status: "error", error: "Invalid credentials"})
            }
            
            req.session.user = {
                name: req.user.name,
                email: req.user.email,
                rol: "user",
            }

            res.json({ status:"success", payload: "New session initialized"})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", error: "Internal Server Error" })
        }
    }
)

router.get("/failLogin", (req, res) => {
    res.json({ status: "error", error: "Failed SignUp"})
})

router.patch( "/:id", async (req, res) =>{
    try {
        const { id } = req.params

        await Users.updateOne({ _id: id}, req.body)

        res.json({ message: "User uploaded successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
})

router.delete( "/:id", async (req, res) =>{
    try {
        const { id } = req.params

        await Users.updateOne({ _id: id}, {status: false})

        res.json({ message: "User deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
})


module.exports = router