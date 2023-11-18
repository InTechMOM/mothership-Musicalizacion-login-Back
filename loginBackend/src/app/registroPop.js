export function initRegistroPop() {
    const registroForm = document.getElementById('registroForm');
    const emailInput = document.getElementById('registroEmail');
    const nombreInput = document.getElementById('registroNombre');
    const apellidoInput = document.getElementById('registroApellido');
    const passwordInput = document.getElementById('registroPassword');
    const passwordRequirements = document.getElementById('passwordRequirements');
  
    // Agregar eventos de entrada para verificar la contraseña en tiempo real
    if (passwordInput) {
      passwordInput.addEventListener('input', checkRegistroPassword);
    }
  
    registroForm.addEventListener('submit', function (event) {
      event.preventDefault();
      registrarUsuario();
    });
  
    function checkRegistroPassword() {
      const password = passwordInput.value;
  
      // Verificar los requisitos de la contraseña y actualizar el estilo del campo
      const lengthRequirement = document.getElementById('length');
      const specialRequirement = document.getElementById('special');
      const uppercaseRequirement = document.getElementById('uppercase');
      const numberRequirement = document.getElementById('number');
      const lowercaseRequirement = document.getElementById('lowercase');
  
      lengthRequirement.classList.toggle('valid', password.length >= 8);
      specialRequirement.classList.toggle('valid', /[!@#$%^&*(),.?":{}|<>]/.test(password));
      uppercaseRequirement.classList.toggle('valid', /[A-Z]/.test(password));
      numberRequirement.classList.toggle('valid', /\d/.test(password));
      lowercaseRequirement.classList.toggle('valid', /[a-z]/.test(password));
  
      // Actualizar el estilo del campo de contraseña
      passwordInput.classList.toggle('valid', passwordRequirements.classList.contains('valid'));
      passwordInput.classList.toggle('invalid', passwordRequirements.classList.contains('invalid'));
    }
  
    async function registrarUsuario() {
      // Verificar campos no vacíos
      if (!nombreInput.value || !apellidoInput.value || !emailInput.value || !passwordInput.value) {
        alert('Todos los campos son obligatorios.');
        return;
      }
  
      // Verificar correo válido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        alert('Correo electrónico no válido.');
        return;
      }
  
      // Verificar contraseña
      if (!passwordRequirements.classList.contains('valid')) {
        alert('La contraseña no cumple con los requisitos.');
        return;
      }
  
      // Crear usuario en la base de datos (MongoDB)
      try {
        const response = await fetch('/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: nombreInput.value,
            apellido: apellidoInput.value,
            email: emailInput.value,
            password: passwordInput.value,
          }),
        });
  
        const data = await response.json();
  
        if (response.status === 200) {
          alert(data.mensaje);
        } else {
          alert('Error al registrar el usuario.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  