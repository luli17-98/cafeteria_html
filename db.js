const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // en XAMPP suele ser 'root'
  password: '',      // si no colocaste contraseña, dejalo vacío
  database: 'cafeteria'
});

conexion.connect((err) => {
  if (err) {
    console.error('Error al conectar:', err);
    return;
  }
  console.log('Conectado a MySQL.');
});

module.exports = conexion;

