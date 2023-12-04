import { initRegistroPop, checkRegistroPassword, registrarUsuario } from './registroPop.js';
import { initLoginPop, login, marcarCampoInvalido } from './loginPop.js';
import { initRecuperarContraseñaPop, checkRecuperarContraseña, recuperarContraseña } from './paswordPop.js';

document.addEventListener('DOMContentLoaded', function () {
  // Inicializar pop-ups
  initRegistroPop();
  initLoginPop();
  initRecuperarContraseñaPop();
});
