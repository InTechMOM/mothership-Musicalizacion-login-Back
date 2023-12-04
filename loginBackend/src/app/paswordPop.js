export function initRecuperarContraseñaPop() {
    const recuperarContraseñaForm = document.getElementById('recuperarContraseñaForm');
    const recuperarContraseñaEmailInput = document.getElementById('recuperarContraseñaEmail');
    const nuevaContraseñaInput = document.getElementById('nuevaContraseña');
    const nuevaContraseñaRequirements = document.getElementById('nuevaContraseñaRequirements');
  
    // Agregar eventos de entrada para verificar la nueva contraseña en tiempo real
    if (nuevaContraseñaInput) {
      nuevaContraseñaInput.addEventListener('input', checkNuevaContraseña);
    }
  
    recuperarContraseñaForm.addEventListener('submit', function (event) {
      event.preventDefault();
      recuperarContraseña();
    });
  
    function checkNuevaContraseña() {
      const password = nuevaContraseñaInput.value;
  
      // Verificar los requisitos de la nueva contraseña y actualizar el estilo del campo
      const lengthRequirement = document.getElementById('nuevaContraseñaLength');
      const specialRequirement = document.getElementById('nuevaContraseñaSpecial');
      const uppercaseRequirement = document.getElementById('nuevaContraseñaUppercase');
      const numberRequirement = document.getElementById('nuevaContraseñaNumber');
      const lowercaseRequirement = document.getElementById('nuevaContraseñaLowercase');
  
      lengthRequirement.classList.toggle('valid', password.length >= 8);
      specialRequirement.classList.toggle('valid', /[!@#$%^&*(),.?":{}|<>]/.test(password));
      uppercaseRequirement.classList.toggle('valid', /[A-Z]/.test(password));
      numberRequirement.classList.toggle('valid', /\d/.test(password));
      lowercaseRequirement.classList.toggle('valid', /[a-z]/.test(password));
  
      // Actualizar el estilo del campo de nueva contraseña
      nuevaContraseñaInput.classList.toggle('valid', nuevaContraseñaRequirements.classList.contains('valid'));
      nuevaContraseñaInput.classList.toggle('invalid', nuevaContraseñaRequirements.classList.contains('invalid'));
    }
  
    async function recuperarContraseña() {
      // Verificar campos no vacíos
      if (!recuperarContraseñaEmailInput.value || !nuevaContraseñaInput.value) {
        alert('Todos los campos son obligatorios.');
        return;
      }
  
      // Verificar correo válido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(recuperarContraseñaEmailInput.value)) {
        alert('Correo electrónico no válido.');
        return;
      }
  
      // Verificar nueva contraseña
      if (!nuevaContraseñaRequirements.classList.contains('valid')) {
        alert('La nueva contraseña no cumple con los requisitos.');
        return;
      }
  
      // Enviar datos de recuperación de contraseña al backend (MongoDB)
      try {
        const response = await fetch('/recuperar-contraseña', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: recuperarContraseñaEmailInput.value,
            nuevaContraseña: nuevaContraseñaInput.value,
          }),
        });
  
        const data = await response.json();
  
        if (response.status === 200) {
          alert(data.mensaje);
        } else {
          alert('Error en la recuperación de contraseña.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  