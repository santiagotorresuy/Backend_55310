const socket = io();

const chatBox = document.getElementById("chatBox")

const chat = async () => {
    const swal = await Swal.fire({
        title: "Identifícate",
        input: "text",
        text: "Ingresa el usuario para identificarte",
        inputValidator: value => {
            return !value && "Necesitas ingrasar tu nickname"
        },
        allowOutsideClick: false,
    })

    const user = swal.value

    socket.emit("auth", user)

    chatBox.addEventListener("keyup", e => {
        if(e.key === "Enter"){
            if(chatBox.value.trim().length > 0){
                socket.emit("message", { user, message: chatBox.value })
                chatBox.value = ""
            }
        }
    })

    socket.on("messageLogs", data => {
        const log = document.getElementById("messageLogs")
        let messages = []

        data.forEach( message => messages += `${message.user} dice: ${message.message} </br>`)

        log.innerHTML = messages
    })

    socket.on("newUser", data => {
        Swal.fire({
            text: `${data} se acaba de conectar`,
            toast: true,
            position: "top-right",
        })
    })
    
}

chat(chatBox)