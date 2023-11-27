export function initLoginPop() {
  const loginForm = document.getElementById('loginForm');
  const loginEmailInput = document.getElementById('loginEmail');
  const loginPasswordInput = document.getElementById('loginPassword');
  const openInicioButton = document.getElementById('openInicio');
  const inicioPopUp = document.getElementById('inicioPopUp');
  const closeInicioButton = document.getElementById('closeInicio');

  // Agregar evento clic al botón de inicio
  if (openInicioButton && inicioPopUp && closeInicioButton) {
      openInicioButton.addEventListener('click', function () {
          // Muestra el pop-up
          inicioPopUp.style.display = 'block';
      });

      closeInicioButton.addEventListener('click', function () {
          // Oculta el pop-up al hacer clic en el botón de cierre
          inicioPopUp.style.display = 'none';
      });
  }

  loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      login();
  });

  async function login() {
      // Verificar campos no vacíos
      if (!loginEmailInput.value || !loginPasswordInput.value) {
          alert('Todos los campos son obligatorios.');
          return;
      }

      // Verificar correo válido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginEmailInput.value)) {
          alert('Correo electrónico no válido.');
          return;
      }

      // Enviar datos de inicio de sesión al backend (MongoDB)
      try {
          const response = await fetch('/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email: loginEmailInput.value,
                  password: loginPasswordInput.value,
              }),
          });

          const data = await response.json();

          if (response.status === 200) {
              alert(data.mensaje);
          } else {
              alert('Error en el inicio de sesión.');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  }
}
