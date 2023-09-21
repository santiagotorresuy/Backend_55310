const loginForm = document.getElementById("loginForm")
const responseRegister = document.getElementById("response")

const login = async () => {
    try {
        loginForm.addEventListener("submit", async e => {
            e.preventDefault()
    
            const data = {}
            const formData = new FormData(loginForm)
            console.log(data)
    
            formData.forEach((value, key) => (data[key] = value))

            const URL = 'http://localhost:8080/api/users/login'
            const headers = {
                'Content-Type': 'application/json',
            }
            const method = "POST"
            const body = JSON.stringify(data)
    
            const response = await fetch(URL, {
                headers,
                method,
                body,
            })
            
            const newSession = await response.json()
            console.log(newSession.payload)

            responseRegister.innerHTML = `${newSession.payload}`
            console.log(newSession)
        })
    } catch (error) {
        console.log(error)
    }
}

login()