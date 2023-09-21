const express = require("express");
const handlebars = require("express-handlebars");

const cookieParser = require("cookie-parser")
const session = require("express-session");
const MongoStore = require("connect-mongo")
const { db, secret } = require("./config/index.config");

const mongoConnect = require("./db")    
const router = require("./routes/index");
const initializedPassport = require("./config/passport.config");
const passport = require("passport");

const app = express()


app.use(express.json());
express.urlencoded({extended:true})
app.use(express.static(__dirname + '/public'))

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${db.user}:${db.pass}@${db.host}/${db.name}?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600
    }),
    secret: secret,
    resave: true,
    saveUninitialized: false,
}))

initializedPassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

mongoConnect()

router(app) 

module.exports = app

 



