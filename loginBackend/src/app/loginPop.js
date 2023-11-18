export function initLoginPop() {
    const loginForm = document.getElementById('loginForm');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
  
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
  