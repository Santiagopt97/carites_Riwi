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
    <button type="button" id="logout-button" class="register " data-bs-toggle="modal"
    on>Cerrar Sesión</button>`
    let logout = document.querySelector("#logout-button")
      logout.addEventListener("click", () => {
        localStorage.removeItem("userOnline");
        location.reload();
      })
    }
  })