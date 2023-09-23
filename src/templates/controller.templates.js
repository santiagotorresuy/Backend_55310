const { Router } = require("express");

// const protectedRoute = require("../middlewares/protected-route.middleware");
const { authToken } = require("../utils/jwt.util");
const passport = require("passport");
const UsersMongoDao = require("../DAOs/users/userMongo.dao");

const router = Router();
const UsersMongo = new UsersMongoDao()

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

//auth() = ["ADMIN", "SUPERADMIN"] if(!...) (403) forbidden
router.get("/profile", (req, res) => { 
    
    return res.render("profile", {
        style: "profile"
    })
    // res.status(401).json({ status: "error", error: "Unauthorized"})
}) 

router.get("/profile-info", 
    passport.authenticate("jwt", { session: false }), async (req, res) => {

    console.log(req.user)
    const user = await UsersMongo.findOne("_id", req.user.user)
    console.log(user)

    const userProfile = {
        name: user.name,
        email: user.email,
        role: "user"
    }

    res.render("profile", {
        user: userProfile,
        style: "profile"
    })
    // res.json({ message: "Profile" })
})

module.exports = router 