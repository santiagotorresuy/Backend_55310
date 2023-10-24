class UserDTO {
    constructor(userInfo){
        this.name = userInfo.name,
        this.lastname = userInfo.lastname,
        this.email = userInfo.email,
        this.role = userInfo.role,
        this.createdAt = new Date()
    }
}

module.exports = UserDTO