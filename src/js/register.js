// declaration of variables

const form = document.getElementById("form-register")
const username = document.getElementById("username")
const lastName = document.getElementById("last-name")
const tel = document.getElementById("tel")
const whatsapp = document.getElementById("whatsapp")
const cedula = document.getElementById("cedula")
const ubication = document.getElementById("reg")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirm-password")

form.addEventListener("submit", async (event) => {

    event.preventDefault()
    const checkPassword = validatePasswords(password, confirmPassword)
    if(checkPassword == true){
        await registerUser(username, lastName, email, password, tel, whatsapp, cedula, ubication)
        location.reload()
     }else{
       alert("las contraseñas no coinciden o el email ya existe")
     }

})

function validatePasswords(password, confirmPassword) {
    if (password.value === confirmPassword.value) {
        return true
    } else {
        alert("no coinciden las contraseñas")
        return false
    }
}


async function validateEmail(email) {
    const response = await fetch(`https://carites-db.vercel.app/agriculturalProducts?email=${email.value}`)
    const data = await response.json()

    if (data.length === 0) {
        return true
    } else {
        return false
    }
}

async function registerUser (username, lastName, email, password, tel, whatsapp, cedula, ubication) {
    const newUser = {
        ownerName: username.value.toLowerCase(),
        ownerLastName: lastName.value.toLowerCase(),
        ownerDocument: cedula.value,
        ownerTown: ubication.value,
        ownerPhoneNumber: tel.value,
        ownerNumberWhatsapp: whatsapp.value,
        ownerEmail: email.value,
        ownerPassword: password.value
    }
    await fetch("https://carites-db.vercel.app/user", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json"
        }
      })
    }

