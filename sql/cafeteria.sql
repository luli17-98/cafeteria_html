-- Base de Datos para Tienda de Café
-- Creado: 2025
-- Autor: Luciana Garay

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS cafeteria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE cafeteria;

-- Tabla de Suscripciones
CREATE TABLE IF NOT EXISTS suscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_fecha (fecha_registro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de ejemplo (opcional)
INSERT INTO suscripciones (nombre, email) VALUES
('Juan Pérez', 'juan.perez@example.com'),
('María García', 'maria.garcia@example.com'),
('Carlos López', 'carlos.lopez@example.com')
ON DUPLICATE KEY UPDATE nombre=nombre;

-- Verificar que la tabla se creó correctamente
SELECT 'Tabla suscripciones creada exitosamente' AS Mensaje;
SELECT COUNT(*) AS 'Total de registros' FROM suscripciones;