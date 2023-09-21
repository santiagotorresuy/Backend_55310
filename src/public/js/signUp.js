const signUpform = document.getElementById("signUpForm")

const signUp = async () => {
    try {
        signUpform.addEventListener("submit", async e => {
            e.preventDefault()
        
            const data = {}
            const formData = new FormData(signUpform)
        
            console.log(data)
        
            formData.forEach((value, key) => (data[key] = value))
        
            const response = await fetch('http://localhost:8080/api/users/signUp', {
                headers: {
                    'Content-Type': 'application/json',
                  },
                method: 'POST',
                body: JSON.stringify(data),
              })
            
            const newUser = await response.json()
            console.log(newUser)
        })
    } catch (error) {
        console.log(error)
    }
}

signUp()