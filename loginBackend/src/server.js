const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/nombre-de-tu-base-de-datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir el esquema del modelo de usuario
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  contraseña: String,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Configurar el middleware para analizar datos JSON
app.use(express.json());

// Rutas para el registro, inicio de sesión y recuperación de contraseña
app.post('/registro', async (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body;

  try {
    const nuevoUsuario = new Usuario({ nombre, apellido, email, contraseña });
    await nuevoUsuario.save();
    res.status(200).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

app.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ email, contraseña });
    if (usuario) {
      res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

app.post('/recuperar-contraseña', async (req, res) => {
  const { email, nuevaContraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (usuario) {
      usuario.contraseña = nuevaContraseña;
      await usuario.save();
      res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente' });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

