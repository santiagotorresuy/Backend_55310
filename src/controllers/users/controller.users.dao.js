const { Router } = require("express")
const passport = require("passport")
const UsersMongoDao = require("../../DAOs/users/userMongo.dao")
const { comparePassword } = require("../../utils/bcrypt")
const { generateToken, authToken } = require("../../utils/jwt.util")
// const roles = require("../middlewares/roles.middleware")

const UsersMongo = new UsersMongoDao()
const router = Router()

//DEFINIDAS ANTES DE LAS RUTAS QUE DEVUELVEN DATOS DE USUARIO
router.get("/github",
    passport.authenticate("github", { scope: ["user: email"] }),
    (req, res) => {}
)   

router.get("/githubcallback",
     passport.authenticate("github", { failureRedirect: "/login" }),
     (req, res) => {
        req.session.user = req.user
        res.redirect("/api/templates/profile")
     }
)

router.post("/signUp",
    passport.authenticate("signUp", { failureRedirect: "/failSignUp"}), 
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
    async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await UsersMongo.findOne("email", email)

            if(!user){
                return res.status(400).json({ status: "error", error: "Invalid Credentials"})
            }
 
            if(!comparePassword(password, user.password)){
                return res.status(400).json({ status: "error", error: "Invalid Credentials"})
            }

            req.user = {
                name: user.name,
                email: email,
                role: "user",
            }

            const token = generateToken(user._id)

            res.cookie("authCookie", token, { maxAge: 30000, httpOnly: true })
                .json({ status:"success", payload:"New session initilized", token})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", error: "Internal Server Error" })
        }
    }
)
 
router.get("/failLogin", (req, res) => {
    res.json({ status: "error", error: "Failed SignUp"})
})


router.get("/", 
    // authToken,
    // roles("user"),
    async (req, res) =>{
        try {  
            const users = await UsersMongo.findAll()
            res.json({ message: users })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: "error", error: "Internal Server Error" })
        } 
}) 
   
router.get("/:uid", async (req, res) =>{
    try {
        const { uid } = req.params

        const user = await UsersMongo.findOne(uid)

        res.json( { message: user } )
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
})

router.patch( "/:id", async (req, res) =>{
    try {
        const { id } = req.params

        await UsersMongo.updateOne({ _id: id}, req.body)

        res.json({ message: "User uploaded successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
})

router.delete( "/:id", async (req, res) =>{
    try {
        const { id } = req.params

        await UsersMongo.updateOne({ _id: id}, {status: false})

        res.json({ message: "User deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
})


module.exports = router