const roles = (role) => {
    return (req, res, next) => {
        if(role !== req.user.role){
            return res.status(403).json({ status: "error", error: "Forbidden"})
        }
        next()
    }
}

module.exports = roles