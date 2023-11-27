// Importar la función createPreview de videoCreator.js
import { createPreview } from './videoCreator';

// Función para manejar los controles de la vista previa
function handlePreviewControls() {
  const volumeVoice = document.getElementById('volumeVoice');
  const volumeMusic = document.getElementById('volumeMusic');
  const toggleVoice = document.getElementById('toggleVoice');
  const toggleMusic = document.getElementById('toggleMusic');

  // Manejar cambios en los controles
  volumeVoice.addEventListener('input', updatePreview);
  volumeMusic.addEventListener('input', updatePreview);
  toggleVoice.addEventListener('change', updatePreview);
  toggleMusic.addEventListener('change', updatePreview);

  // Función para actualizar la vista previa
  function updatePreview() {
    const controls = {
      volumeVoice: volumeVoice.value,
      volumeMusic: volumeMusic.value,
      toggleVoice: toggleVoice.checked,
      toggleMusic: toggleMusic.checked,
      arquetipo: "Inocente", // Cambia esto con la lógica adecuada
    };

    // Llamada a la función createPreview en videoCreator.js
    createPreview(controls);
  }
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', handlePreviewControls);

  