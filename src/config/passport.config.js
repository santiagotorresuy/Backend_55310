const passport = require("passport")
const local = require("passport-local")
const GithubStrategy = require("passport-github2") //ESTRATEGIA DE LOGIN CON GITHUB
const jwt = require("passport-jwt") //JSON WEB TOKEN

const UsersMongoDao = require("../DAOs/users/userMongo.dao.js")
const { comparePassword, getHashedPassword } = require("../utils/bcrypt") //HASHEO DE PASSWORD
const { github_passport, jwtConfig } = require("../config/index.config") //DOTENV CONFIG (PARA MANEJOS DE DATOS SENSIBLES)
const cookieExtractor = require("../utils/cookie-extractor.utils.js") //CONFIG DE COOKIE EXTRACTOR PARA CONFIGURAR LA COOKIE QUE SE V A AUTILIZAR

const LocalStrategy = local.Strategy //STRATEGY PARA CONFIGURACION DE PASSPORT
const JWTStrategy = jwt.Strategy //STRATEGY PARA CONFIGURACION DE JSON WEB TOKEN
const ExtractJwt = jwt.ExtractJwt //STRATEGY PARA CONFIGURACION DE JSON WEB TOKEN

const UsersMongo = new UsersMongoDao() //INSTANCIA DE LA CLASE PARA METODOS DE MONGO PARA USUARIOS

const initializedPassport = () => {

    //LOGIN
    passport.use(
        "signUp",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: "email" },

            async ( req, username, password, done ) => {
                const { name, lastName, age, email } = req.body

                try {
                    const user = await UsersMongo.findOne("email", username);

                    if(user){
                        console.log("User already exists") 
                        return done(null, false)
                    }

                    const userInfo = {
                        name,  
                        lastName,
                        email,
                        age,
                        password: getHashedPassword(password),
                    }
                
                    const newUser = await UsersMongo.insertOne(userInfo)
                    console.log(newUser)
                
                    done(null, newUser)
                } catch (error) {
                    done(`Error creating user: ${error}`)
                }
            }
        )
    )

    passport.use(
        "login",
        new LocalStrategy(
            { usernameField: "email" },
            async (username, password, done) => {
                try {
                    const user = await UsersMongo.findOne("email", username)

                    if(!user){
                        console.log("User doesn't exist")
                        return done(null, false, {message: "No user found"})
                    }

                    if(!comparePassword(password, user.password)){
                        return done(null, false)
                    }

                    return done(null, user)
                } catch (error) {
                    done(error)
                }
            }
        )
    )

    passport.use(
        "github", 
        new GithubStrategy({
            clientID: github_passport.clientID,
            clientSecret: github_passport.clientSecret,
            callbackURL: "http://localhost:8080/api/users/githubcallback",
        },
        async (accessToken, refreshToken, profile, done) => {   
            try {
                console.log(profile)

                const user = await UsersMongo.findOne("email", profile._json.email)

                if(!user) {
                    const userData = {
                        name: profile._json.name,
                        lastName: "",
                        email: profile._json.email,
                        password: "", 
                    }

                    const newUser = await UsersMongo.insertOne(userData)
                    return done(null, newUser)
                }

                done(null, user)
            } catch (error) {
                done(null, error)
            }
    }))

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: jwtConfig.secret,
    }, async (jwt_payload, done) => {
        try {
            done(null, jwt_payload)
        } catch (error) {
            done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UsersMongo.findOne("_id", id)
        done(null, user)
    })
}

module.exports = initializedPassport