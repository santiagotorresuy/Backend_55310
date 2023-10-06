const { Router } = require("express")

class CustomRouter {
    constructor() {
        this.router = Router()
        this.init()
    }

    init() {}

    getRouter() {
        return this.router
    }

    get(path, ...callbacks) {
        this.router.get(
            path,
            this.generateCustomResponses,
            this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks) {
        return callbacks.map( callback => async (...params) => {
           try {
               callback.apply(this, params)
           } catch (error) {
                console.log(error)
                params[1]
                    .status(500)
                    .json( { status: "error", error: "Internal Server Error" })
           }
        })
    }

    generateCustomResponses(req, res, next) {
        res.sendSuccess = message => 
            res.status(200).json({ status: "success", message })

        res.sendSuccessCreated = () => 
            res.status(201).json({ status: "success", message: "Created resource"})
        
        res.sendServerError = error => 
            res.status(500).json({ status: "error", error})

        next()
    }
}

module.exports = CustomRouter