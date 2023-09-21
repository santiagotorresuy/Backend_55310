const protectedRoute = (req, res, next) => {
    if(!req.session.user){
        return res.status(400).json({ status: "error", error: "User and password not matched"})
    }        //res.redirect("/login")

    next()
}

module.exports = protectedRoute