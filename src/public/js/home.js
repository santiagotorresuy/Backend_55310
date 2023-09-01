const socket = io();

const form = document.getElementById('createProduct')

form.addEventListener('submit', event => {
  event.preventDefault()

  const data = new FormData(form)
 
  const prod = {}
  
  data.forEach((value, key) => (prod[key] = value))
  
  socket.emit("messageProd", prod)


  fetch('http://localhost:8080/api/products', {
      headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(prod),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
})







