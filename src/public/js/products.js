const outdoorBtn = document.getElementById("outdoor")
const indoorBtn = document.getElementById("indoor")
const productCard = document.getElementById("productCard")

const filter = async () => {
    try {
        outdoorBtn.addEventListener("click", async e => {
            const category = e.target.id

            const URL = `/api/products?category=${category}`
            const headers = {
                'Content-Type': 'application/json',
            } 
            const method = "GET" 
    
            await fetch(URL, {
                headers,
                method,
            }).then(response => response.json())
            .then(data => console.log(data))
        })

        productCard.addEventListener("click", async e => {
            const target = e.target.id
            console.log(target)
        })

        // indoorBtn.addEventListener("click", async e => {
        //     const target = e.target.id
        //     console.log(target)
        // })
    } catch (error) {
        console.log(error)
    }
}

filter()