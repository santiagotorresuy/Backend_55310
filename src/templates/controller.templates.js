const { Router } = require("express");

const protectedRoute = require("../middlewares/protected-route.middleware");

const router = Router();

router.get("/signUp", (req, res) => {
    res.render("signUp", { 
        style: "signUp"
    })
})

router.get("/login", (req, res) => {
    res.render("login", {
        style: "login"
    })
})

router.get("/profile", protectedRoute, (req, res) => { //auth() = ["ADMIN", "SUPERADMIN"] if(!...) (403) forbidden
    if(req.session.user){
        const user ={
            name: req.session.user.name,       
            email: req.session.user.email,
            role: "user",
        }

        return res.render("profile", {
            user,
            style: "profile"
        })
    }
    res.status(401).json({ status: "error", error: "Unauthorized"})
}) 

module.exports = router