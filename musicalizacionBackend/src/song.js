// Tipos de arquetipos a seleccionar y sus canciones modelo
const arquetiposSong = {
  Inocente: ['../music/inocente.mp3'],
  Comun: ['../music/comun.mp3'],
  Cuidadora: ['../music/cuidadora.mp3'],
  Creativa: ['../music/creativa.mp3'],
  Rebelde: ['../music/rebelde.mp3'],
  Gobernante: ['../music/gobernante.mp3'],
  Bufona: ['../music/bufon.mp3'],
  Maga: ['../music/maga.mp3'],
  Sabia: ['../music/sabio.mp3'],
  Amante: ['../music/amante.mp3'],
  Exploradora: ['../music/explorador.mp3'],
  Heroina: ['../music/heroe.mp3']
};

// Función que selecciona una canción aleatoria para cada arquetipo del array - Temporalmente solo con una canción modelo.
function selectSong(arquetipo) {
  try {
    const song = arquetiposSong[arquetipo];
    const indiceAleatorio = Math.floor(Math.random() * song.length);
    return song[indiceAleatorio];
  } catch (error) {
    console.error(error.message);
    return null; // Devuelve null en caso de error
  }
}

let audio = null;
let voiceAudio = null;
let musicAudio = null;
let image = null;
let arquetipo = ""; // Define la variable arquetipo

const contenidoTerminado = document.getElementById('contenidoTerminado');
const $listo = document.querySelector('#listo');
$listo.addEventListener('click', () => aceptAndShare(arquetipo)); // Pasa el arquetipo como parámetro

const botonCompartir = document.getElementById('botonCompartir');
botonCompartir.addEventListener('click', compartirContenido);

// Elementos de control de sonido
const $toggleVoice = document.getElementById('toggleVoice');
const $toggleMusic = document.getElementById('toggleMusic');
const $voiceVolume = document.getElementById('voiceVolume');
const $musicVolume = document.getElementById('musicVolume');

// Resto del código...

function aceptAndShare(arquetipo) {
  // Eliminar elementos de sonido existentes
  if (voiceAudio) {
    voiceAudio.pause();
    voiceAudio.remove();
  }
  if (musicAudio) {
    musicAudio.pause();
    musicAudio.remove();
  }

  image = document.createElement('img');
  image.src = 'imagenCreada'; // Añadir URL de la imagen generada anteriormente

  // Verificar qué elementos de sonido deben estar activados
  if ($toggleVoice.checked) {
    voiceAudio = document.createElement('audio');
    voiceAudio.src = selectSong(arquetipo);
    voiceAudio.volume = $voiceVolume.value / 100; // Ajustar el volumen
    contenidoTerminado.appendChild(voiceAudio);
    voiceAudio.play(); // Reproducir inmediatamente si está activado
  }

  if ($toggleMusic.checked) {
    musicAudio = document.createElement('audio');
    musicAudio.src = selectSong(arquetipo);
    musicAudio.volume = $musicVolume.value / 100; // Ajustar el volumen
    contenidoTerminado.appendChild(musicAudio);
    musicAudio.play(); // Reproducir inmediatamente si está activado
  }

  contenidoTerminado.appendChild(image);
  botonCompartir.style.display = 'inline'; // Mostrar el botón "Compartir"
}

// Resto del código...
// Reproductor de música
const $music = document.querySelector('#music');
const $play = document.querySelector('#play');
const $pause = document.querySelector('#pause');

$play.addEventListener('click', handlePlay);
$pause.addEventListener('click', handlePause);

function handlePlay() {
  $music.play();
  $play.hidden = true;
  $pause.hidden = false;
}

function handlePause() {
  $music.pause();
  $play.hidden = false;
  $pause.hidden = true;
}

const $progress = document.querySelector('#progress');
$music.addEventListener('loadedmetadata', handleLoaded);
$music.addEventListener('timeupdate', handleTimeUpdate);

function handleLoaded() {
  $progress.max = $music.duration;
}

function handleTimeUpdate() {
  $progress.value = $music.currentTime;
}

$progress.addEventListener('input', handleInput);

function handleInput() {
  $music.currentTime = $progress.value;
}
