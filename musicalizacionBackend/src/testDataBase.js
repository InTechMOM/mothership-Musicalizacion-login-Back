const express = require('express');
const db = require('./db'); // Importa la configuración de la base de datos
const app = express();
const port = 3000;

app.use(express.json());
// Definir un modelo de datos con Mongoose
const Arquetipos = db.model('arquetipos', {
  Inocente: Array,
  
});

// Ruta para obtener todos los elementos
app.get('/arquetipos', async (req, res) => {
  const arquetipo = await Arquetipos.find();
  res.json(arquetipo);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Listado de arquetipos en http://localhost:${port}/arquetipos`);
});