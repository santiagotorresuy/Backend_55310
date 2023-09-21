const passport = require("passport")
const local = require("passport-local")
const UsersMongo = require("../DAOs/users/userMongo.dao.js")
const { comparePassword, getHashedPassword } = require("../utils/bcrypt")

const LocalStrategy = local.Strategy
const Users = new UsersMongo

const initializedPassport = () => {
    passport.use(
        "register",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: "email" },

            async ( req, username, password, done ) => {
                const { name, lastName, age, email } = req.body

                try {
                    const user = await Users.findOne(username);

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
                
                    const newUser = await Users.insertOne(userInfo)
                    console.log(newUser)
                
                    res.status(201).json({ status: "success", payload: newUser })
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
                    const user = await Users.findOne(username)

                    if(!user){
                        console.log("User doesn't exist")
                        return done(null, false)
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

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await Users.findById(id)
        done(null, user)
    })
}

module.exports = initializedPassport