const loginForm = document.getElementById("loginForm")
const responseRegister = document.getElementById("response")

const login = async () => {
    try {
        loginForm.addEventListener("submit", async e => {
            e.preventDefault()
    
            const data = {}
            const formData = new FormData(loginForm)
    
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
            
            const responseData = await response.json()
            localStorage.setItem("authToken", responseData.token)
            responseRegister.innerHTML = `${responseData.payload}`
        })
    } catch (error) {
        console.log(error)
    }
}

login()