const express = require('express');
const db = require('./db'); // Importa la configuración de la base de datos
const app = express();
const port = 27017;

app.use(express.json());
// Definir un modelo de datos con Mongoose
const login = db.model('logiIn', {
  Inocente: Array,
  
});

// Ruta para obtener todos los elementos
app.get('/logIn', async (req, res) => {
  const log = await login.find();
  res.json(log);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Listado de usuarios en http://localhost:${port}/logIn`);
});