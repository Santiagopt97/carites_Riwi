const myNav = document.querySelector("#navbar");

window.onscroll = function () {
  if (window.scrollY > window.innerHeight) {
    myNav.classList.add("scrolled");
  } else {
    myNav.classList.remove("scrolled");
  }
};
document.addEventListener('', () => {
  const loginButton = document.getElementById('loginButton');
  const registerButton = document.getElementById('registerButton');
  const logoutButton = document.getElementById('logoutButton');

  // Comprobar si hay un usuario en el localStorage
  const user = JSON.parse(localStorage.getItem('userOnline'));

  if (user) {
      // Si el usuario está loggeado, ocultar los botones de login y register, y mostrar el de logout
      loginButton.style.display = 'none';
      registerButton.style.display = 'none';
      logoutButton.style.display = 'block';
  } else {
      // Si el usuario no está loggeado, mostrar los botones de login y register, y ocultar el de logout
      loginButton.style.display = 'block';
      registerButton.style.display = 'block';
      logoutButton.style.display = 'none';
  }

  // Agregar el evento de logout
  logoutButton.addEventListener('click', () => {
      // Eliminar la información del usuario del localStorage
      localStorage.removeItem('userOnline');
      
      // Redirigir al usuario a la página de inicio de sesión
      window.location.href = './login.html'; // Ajusta la ruta según tu estructura de archivos
  });
});
