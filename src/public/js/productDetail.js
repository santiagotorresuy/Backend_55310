fetch("/api/templates/product-info", {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
    },
    method: "GET"
}).then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log(error))

