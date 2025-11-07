// app.js (fragmento esencial)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const conexion = require('../../db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// CREATE
app.post('/api/suscripciones', (req, res) => {
  const { nombre, email } = req.body;
  const sql = 'INSERT INTO suscripciones (nombre, email) VALUES (?, ?)';
  conexion.query(sql, [nombre, email], (err, result) => {
    if (err) return res.status(500).send('Error al guardar');
    res.json({ message: 'Suscripción agregada', id: result.insertId });
  });
});

// READ
app.get('/api/suscripciones', (req, res) => {
  conexion.query('SELECT * FROM suscripciones ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).send('Error al leer');
    res.json(rows);
  });
});

// UPDATE
app.put('/api/suscripciones/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  const sql = 'UPDATE suscripciones SET nombre = ?, email = ? WHERE id = ?';
  conexion.query(sql, [nombre, email, id], (err) => {
    if (err) return res.status(500).send('Error al actualizar');
    res.json({ message: 'Suscripción actualizada' });
  });
});

// DELETE
app.delete('/api/suscripciones/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM suscripciones WHERE id = ?';
  conexion.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Error al eliminar');
    res.json({ message: 'Suscripción eliminada' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
