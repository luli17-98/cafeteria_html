// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const conexion = require('./config/db'); // ✅ conexión correcta

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para leer datos del body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// === RUTAS CRUD ===

// CREATE (insertar nueva suscripción)
app.post('/api/suscripciones', (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const sql = 'INSERT INTO suscripciones (nombre, email) VALUES (?, ?)';
  conexion.query(sql, [nombre, email], (err, result) => {
    if (err) {
      console.error('❌ Error en SQL:', err); // 🔥 Mostrará el error real en consola
      return res.status(500).send('Error al guardar');
    }

    console.log('✅ Registro insertado con ID:', result.insertId);
    res.json({ message: '✅ Suscripción agregada correctamente', id: result.insertId });
  });
});

// LEER TODAS LAS SUSCRIPCIONES
app.get('/api/suscripciones', (req, res) => {
  conexion.query('SELECT * FROM suscripciones ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).send('Error al leer');
    res.json(rows);
  });
});

// ACTUALIZAR UNA SUSCRIPCIÓN
app.put('/api/suscripciones/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  const sql = 'UPDATE suscripciones SET nombre = ?, email = ? WHERE id = ?';
  conexion.query(sql, [nombre, email, id], (err) => {
    if (err) return res.status(500).send('Error al actualizar');
    res.json({ message: 'Suscripción actualizada' });
  });
});

// ELIMINAR UNA SUSCRIPCIÓN
app.delete('/api/suscripciones/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM suscripciones WHERE id = ?';
  conexion.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Error al eliminar');
    res.json({ message: 'Suscripción eliminada' });
  });
});

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
