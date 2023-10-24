const { persistence } = require("../config/index.config")

switch (persistence) {
    case "local":
        console.log("CRUD en mongo y fs")
        module.exports = require("../DAOs/fs/users-fs.dao")
        module.exports = require("../DAOs/mongo/users-mongo.dao")
        break;

    case "dev":
        console.log("CRUD solo en mongo")
        module.exports = require("../DAOs/mongo/users-mongo.dao")
}