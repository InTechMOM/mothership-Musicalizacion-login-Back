const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://marinellysfigueroa:ohjwvqNuOqyCsA86@cluster0.me3qbko.mongodb.net/song', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión a la base de datos establecida');
});

module.exports = db;