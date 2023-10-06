const { Router } = require("express");
const { authToken } = require("../utils/jwt.util");
const UsersMongoDao = require("../DAOs/users/userMongo.dao");
const passportCall = require("../utils/passport-call.util");

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

router.get("/profile", (req, res) => { 
    
    return res.render("profile", {
        style: "profile"
    })
    // res.status(401).json({ status: "error", error: "Unauthorized"})
}) 

router.get("/profile-info", 
    passportCall("jwt"), async (req, res) => {

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