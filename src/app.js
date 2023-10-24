const express = require("express");
const handlebars = require("express-handlebars");
const mongoConnect = require("./db")    
const cookieParser = require("cookie-parser")

const router = require("./routes/index");
const passport = require("passport");
const initializedPassport = require("./config/passport.config");

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
app.use(cookieParser());

initializedPassport()
app.use(passport.initialize())

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

mongoConnect()

router(app) 

module.exports = app

 



