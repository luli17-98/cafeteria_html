/**
 * Servidor Express para Tienda de Café
 * Incluye API REST con CRUD completo para suscripciones
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const conexion = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Logs de peticiones (para debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ==================== RUTAS API ====================

// CREATE - Crear nueva suscripción
app.post('/api/suscripciones', (req, res) => {
  const { nombre, email } = req.body;
  
  // Validaciones
  if (!nombre || !email) {
    return res.status(400).json({ 
      error: 'Nombre y email son requeridos' 
    });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ 
      error: 'Email no válido' 
    });
  }

  const sql = 'INSERT INTO suscripciones (nombre, email) VALUES (?, ?)';
  
  conexion.query(sql, [nombre, email], (err, result) => {
    if (err) {
      console.error('Error al guardar:', err);
      
      // Manejar error de email duplicado
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ 
          error: 'Este email ya está registrado' 
        });
      }
      
      return res.status(500).json({ 
        error: 'Error al guardar en la base de datos' 
      });
    }
    
    console.log('✅ Suscripción creada:', result.insertId);
    res.status(201).json({ 
      success: true,
      message: '¡Suscripción exitosa! Gracias por registrarte.',
      id: result.insertId 
    });
  });
});

// READ - Obtener todas las suscripciones
app.get('/api/suscripciones', (req, res) => {
  const sql = 'SELECT id, nombre, email, fecha_registro, activo FROM suscripciones ORDER BY id DESC';
  
  conexion.query(sql, (err, rows) => {
    if (err) {
      console.error('Error al leer:', err);
      return res.status(500).json({ 
        error: 'Error al obtener suscripciones' 
      });
    }
    
    console.log(`📋 Se obtuvieron ${rows.length} suscripciones`);
    res.json(rows);
  });
});

// READ - Obtener una suscripción por ID
app.get('/api/suscripciones/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM suscripciones WHERE id = ?';
  
  conexion.query(sql, [id], (err, rows) => {
    if (err) {
      console.error('Error al leer:', err);
      return res.status(500).json({ 
        error: 'Error al obtener suscripción' 
      });
    }
    
    if (rows.length === 0) {
      return res.status(404).json({ 
        error: 'Suscripción no encontrada' 
      });
    }
    
    res.json(rows[0]);
  });
});

// UPDATE - Actualizar suscripción
app.put('/api/suscripciones/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  
  // Validaciones
  if (!nombre || !email) {
    return res.status(400).json({ 
      error: 'Nombre y email son requeridos' 
    });
  }

  const sql = 'UPDATE suscripciones SET nombre = ?, email = ? WHERE id = ?';
  
  conexion.query(sql, [nombre, email, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar:', err);
      
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ 
          error: 'Este email ya está en uso' 
        });
      }
      
      return res.status(500).json({ 
        error: 'Error al actualizar' 
      });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        error: 'Suscripción no encontrada' 
      });
    }
    
    console.log('✏️ Suscripción actualizada:', id);
    res.json({ 
      success: true,
      message: 'Suscripción actualizada correctamente' 
    });
  });
});

// DELETE - Eliminar suscripción
app.delete('/api/suscripciones/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM suscripciones WHERE id = ?';
  
  conexion.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar:', err);
      return res.status(500).json({ 
        error: 'Error al eliminar' 
      });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        error: 'Suscripción no encontrada' 
      });
    }
    
    console.log('🗑️ Suscripción eliminada:', id);
    res.json({ 
      success: true,
      message: 'Suscripción eliminada correctamente' 
    });
  });
});

// ==================== RUTAS WEB ====================

// Ruta principal - Sirve el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada' 
  });
});

// ==================== INICIAR SERVIDOR ====================

app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════');
  console.log('☕ SERVIDOR TIENDA DE CAFÉ INICIADO');
  console.log('═══════════════════════════════════════════');
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📂 Directorio público: ${path.join(__dirname, 'public')}`);
  console.log(`⏰ Iniciado: ${new Date().toLocaleString()}`);
  console.log('═══════════════════════════════════════════');
  console.log('Presiona Ctrl+C para detener el servidor');
  console.log('═══════════════════════════════════════════\n');
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('⚠️ Cerrando servidor...');
  conexion.end();
  process.exit(0);
});