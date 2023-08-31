const { port } = require("./config/index.config")

const realTimeServer = require("./io.js")
const app = require("./app.js")

const httpServer = app.listen(port, () =>{
    console.log(`Running on port ${port}`)
})  

realTimeServer(httpServer)  

