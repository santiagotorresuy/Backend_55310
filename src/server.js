
const app = require("./app.js")

const port = 8080;

const httpServer = app.listen(port, () =>{
    console.log(`Running on port ${port}`)
})

module.exports = httpServer
