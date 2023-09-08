const express = require("express");
const handlebars = require("express-handlebars");

const router = require("./routes/index");
const mongoConnect = require("./db")

const app = express()

app.use(express.json());
app.use(express.static(__dirname + '/public'))
express.urlencoded({extended:true})

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

mongoConnect()

router(app) 

module.exports = app

 



