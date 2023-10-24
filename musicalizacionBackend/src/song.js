//tipos de arquetipos a seleccionar y sus canciones modelo
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

//función que selecciona una cancion aleatoria para cada arquetipo del 
//array - Temporalmente solo con una canción modelo.

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
let image = null;
const contenidoTerminado = document.getElementById('contenidoTerminado')
const $listo = document.querySelector('#listo');
$listo.addEventListener('click', aceptAndShare);
const botonCompartir = document.getElementById('botonCompartir');
botonCompartir.addEventListener('click', compartirContenido);

function aceptAndShare(selectSong){
  image = document.createElement('img');
  image.src = 'imagenCreada';//add url imágen generada anteriormente
  audio = document.createElement('audio');
  audio = selectSong(arquetipo);
  contenidoTerminado.appendChild(image);
  contenidoTerminado.appendChild(audio);
  botonCompartir.style.display = 'inline' // Mostrar el botón "Compartir"
}

//Eliminar música de fondo del video
const $omitir = document.querySelector('#omitir');
$omitir.addEventListener('click', notMusic);
function notMusic(){
  if (audio) {
    audio.remove(); // Eliminar el elemento de audio
    botonCompartir.style.display = 'inline'; // Mostrar el botón "Compartir"
}
}


const arquetipos = [
  "Inocente", "Común", "Cuidadora", "Creativa", "Rebelde", "Gobernante",
  "Bufona", "Maga", "Sabia", "Amante", "Exploradora", "Heroína"
];

//reproductor de música
  
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