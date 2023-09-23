require("dotenv").config()

module.exports= {
    port: process.env.PORT || 3000,
    db: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
    },
    secretSession: process.env.SECRET_SESSION,
    github_passport: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    jwtConfig:{
        secret: process.env.SECRET_JWT
    }
}