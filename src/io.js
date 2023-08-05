const { Server } = require("socket.io")

const httpServer = require("./server.js")

const io = new Server(httpServer)

io.on("connection", socket => {
    console.log("Connection established successfully")

    socket.on("message", payload => {
        console.log(payload, socket.id)
    })
})