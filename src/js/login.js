// declaration of variables

const form = document.querySelector("#form-login")
const email = document.querySelector("#email-login")
const password = document.querySelector("#password-login")

// event listener for the login

form.addEventListener("submit", async (event) =>{
    event.preventDefault()
    const user = await validateEmail(email)
    if (user === false) {
      alert("el usuario no esta registrado")
    }else{
      if(user.ownerPassword ===password.value){
        localStorage.setItem("userOnline", JSON.stringify(user))
        window.location.href = "./src/pages/users.html"
      }else{
        alert("la contraseña es incorrecta")
      }
    }
  
  })
  
  
  
  
  // async function to validate the email
  
  async function validateEmail (email){
    const response = await fetch(`https://carites-db.vercel.app/user?ownerEmail=${email.value}`)
    const data = await response.json()
  
    if (data.length > 0) {
      return data[0]
    }else{
      return false
    }
  }