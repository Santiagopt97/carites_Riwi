const myNav = document.querySelector("#navbar");
const containerUser = document.querySelector(".position-a")

window.onscroll = function () {
  if (window.scrollY > window.innerHeight) {
    myNav.classList.add("scrolled");
  } else {
    myNav.classList.remove("scrolled");
  }
};

window.addEventListener("load", () => {
  // Recuperamos el item del localStorage
  const userOnline = localStorage.getItem("userOnline");
  if (userOnline !== null) {
    containerUser.innerHTML = `
    <button type="button" id="user-button"  data-bs-toggle="modal"
    on>Usuario</button>
    <button type="button" id="logout-button"  data-bs-toggle="modal"
    on>Cerrar Sesión</button>`
    let logout = document.querySelector("#logout-button")
      logout.addEventListener("click", () => {
        localStorage.removeItem("userOnline");
        location.reload();
      })
    let userButton = document.querySelector("#user-button")
    userButton.addEventListener("click", () => {
      window.location.href = "./src/pages/users.html"
    })
    }
  })