const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// Importar la función createVideo de videoCreator.js
const { createVideo } = require('./videoCreator');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/createVideo', (req, res) => {
  // Llamada a la función createVideo en videoCreator.js
  createVideo(req, res);
});

app.listen(port, () => {
  console.log(`Servidor Express en http://localhost:${port}`);
});


