/**
 * Configuración de Conexión a MySQL
 * Proyecto: Tienda de Café
 */

const mysql = require('mysql2');

// Configuración de la conexión
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // Usuario por defecto de XAMPP
  password: '',           // Contraseña vacía por defecto en XAMPP
  database: 'cafeteria',  // Nombre de tu base de datos
  charset: 'utf8mb4'
});

// Intentar conectar
conexion.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
    console.error('💡 Verifica que:');
    console.error('   1. XAMPP esté ejecutándose');
    console.error('   2. MySQL esté iniciado en XAMPP');
    console.error('   3. La base de datos "cafeteria" exista');
    console.error('   4. Las credenciales sean correctas');
    return;
  }
  console.log('✅ Conectado exitosamente a MySQL - Base de datos: cafeteria');
});

// Manejo de errores de conexión
conexion.on('error', (err) => {
  console.error('❌ Error en la conexión MySQL:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('La conexión con la base de datos se perdió');
  }
  if (err.code === 'ER_CON_COUNT_ERROR') {
    console.error('La base de datos tiene demasiadas conexiones');
  }
  if (err.code === 'ECONNREFUSED') {
    console.error('La conexión fue rechazada. Verifica que MySQL esté corriendo');
  }
});

module.exports = conexion;