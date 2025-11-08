# ☕ Tienda de Café - Sistema Web con CRUD y MySQL

![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![MySQL](https://img.shields.io/badge/MySQL-5.7+-blue)
![Express](https://img.shields.io/badge/Express-4.18+-lightgrey)
![License](https://img.shields.io/badge/license-MIT-blue)

Sistema web completo para una tienda de café con **formulario de suscripción**, **CRUD completo** y conexión a **base de datos MySQL**.

---

## 📋 Características

- ✅ **CRUD Completo** (Create, Read, Update, Delete)
- ✅ **Base de datos MySQL** con XAMPP
- ✅ **API REST** con Express.js
- ✅ **Frontend dinámico** con JavaScript Vanilla
- ✅ **Diseño responsivo** con CSS3
- ✅ **Validaciones** en frontend y backend
- ✅ **Manejo de errores** robusto
- ✅ **100% desarrollo propio** (sin enlaces externos)

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Node.js** | 14+ | Backend/Servidor |
| **Express.js** | 4.18+ | Framework web |
| **MySQL** | 5.7+ | Base de datos |
| **HTML5** | - | Estructura |
| **CSS3** | - | Estilos |
| **JavaScript** | ES6+ | Lógica frontend |

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **XAMPP** (incluye Apache y MySQL)
   - 📥 Descargar: [https://www.apachefriends.org](https://www.apachefriends.org)

2. **Node.js** (versión 14 o superior)
   - 📥 Descargar: [https://nodejs.org](https://nodejs.org)

3. **Git** (opcional, para clonar el repositorio)
   - 📥 Descargar: [https://git-scm.com](https://git-scm.com)

4. **Editor de código** (recomendado: VS Code)
   - 📥 Descargar: [https://code.visualstudio.com](https://code.visualstudio.com)

---

## 🚀 Instalación Paso a Paso

### **Paso 1: Clonar o Descargar el Proyecto**

**Opción A - Con Git:**
```bash
git clone https://github.com/luli17-98/cafeteria_html.git
cd cafeteria_html
```

**Opción B - Descarga Manual:**
1. Descarga el ZIP desde GitHub
2. Extrae el contenido en una carpeta de tu elección
3. Abre la terminal en esa carpeta

### **Paso 2: Instalar Dependencias de Node.js**

```bash
npm install
```

Esto instalará:
- `express` - Framework web
- `body-parser` - Parsear datos POST
- `mysql2` - Driver de MySQL

### **Paso 3: Configurar XAMPP y MySQL**

1. **Abrir XAMPP Control Panel**
2. **Iniciar MySQL** (botón "Start")
3. **Abrir phpMyAdmin**:
   - Ir a: `http://localhost/phpmyadmin`

### **Paso 4: Crear la Base de Datos**

**Opción A - Automática (Recomendada):**
1. En phpMyAdmin, clic en **"SQL"** (pestaña superior)
2. Abrir el archivo `sql/cafeteria.sql` con un editor de texto
3. Copiar todo el contenido
4. Pegarlo en el área de texto de phpMyAdmin
5. Clic en **"Continuar"** o **"Go"**

**Opción B - Manual:**
1. En phpMyAdmin, clic en **"Nueva"** en el panel izquierdo
2. Nombre de la base de datos: `cafeteria`
3. Cotejamiento: `utf8mb4_unicode_ci`
4. Clic en **"Crear"**
5. Seleccionar la base de datos `cafeteria`
6. Clic en **"SQL"** y ejecutar:

```sql
CREATE TABLE suscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### **Paso 5: Verificar Configuración de Base de Datos**

Abre el archivo `config/db.js` y verifica que las credenciales sean correctas:

```javascript
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // Usuario por defecto de XAMPP
  password: '',        // Contraseña vacía por defecto
  database: 'cafeteria'
});
```

**⚠️ Nota:** Si configuraste una contraseña en MySQL, actualiza el campo `password`.

### **Paso 6: Iniciar el Servidor**

```bash
npm start
```

Deberías ver algo como:

```
═══════════════════════════════════════════
☕ SERVIDOR TIENDA DE CAFÉ INICIADO
═══════════════════════════════════════════
🌐 URL: http://localhost:3000
📂 Directorio público: /ruta/a/tu/proyecto/public
⏰ Iniciado: 07/11/2025 15:30:00
═══════════════════════════════════════════
✅ Conectado exitosamente a MySQL - Base de datos: cafeteria
```

### **Paso 7: Abrir en el Navegador**

Visita: **`http://localhost:3000`**

---

## 📁 Estructura del Proyecto

```
cafeteria_html/
│
├── 📂 config/
│   └── db.js                    # ⚙️ Configuración MySQL
│
├── 📂 public/
│   ├── 📂 css/
│   │   └── style.css            # 🎨 Estilos del sitio
│   │
│   ├── 📂 js/
│   │   └── crud.js              # 📝 Lógica CRUD frontend
│   │
│   ├── 📂 img/                  # 🖼️ Imágenes
│   │
│   └── index.html               # 🏠 Página principal
│
├── 📂 sql/
│   └── cafeteria.sql            # 💾 Script de base de datos
│
├── app.js                       # 🚀 Servidor Node.js/Express
├── package.json                 # 📦 Dependencias
├── .gitignore                   # 🚫 Archivos ignorados
└── README.md                    # 📖 Este archivo
```

---

## 🔧 Uso del Sistema

### **1. Crear una Suscripción (CREATE)**

**Desde la Web:**
1. Ir a la sección del footer
2. Llenar el formulario con nombre y email
3. Clic en "Suscribirme"

**Desde la API:**
```bash
curl -X POST http://localhost:3000/api/suscripciones \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez","email":"juan@example.com"}'
```

### **2. Ver Suscripciones (READ)**

**Desde la Web:**
- Hacer scroll hasta la sección "Suscripciones"
- La tabla se carga automáticamente

**Desde la API:**
```bash
curl http://localhost:3000/api/suscripciones
```

### **3. Actualizar Suscripción (UPDATE)**

**Desde la Web:**
1. Clic en el botón "✏️ Editar" de una fila
2. Modificar los datos en los prompts
3. Confirmar los cambios

**Desde la API:**
```bash
curl -X PUT http://localhost:3000/api/suscripciones/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Actualizado","email":"nuevo@example.com"}'
```

### **4. Eliminar Suscripción (DELETE)**

**Desde la Web:**
1. Clic en el botón "🗑️ Eliminar"
2. Confirmar en el diálogo

**Desde la API:**
```bash
curl -X DELETE http://localhost:3000/api/suscripciones/1
```

---

## 🔌 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/suscripciones` | Obtener todas las suscripciones |
| `GET` | `/api/suscripciones/:id` | Obtener una suscripción por ID |
| `POST` | `/api/suscripciones` | Crear nueva suscripción |
| `PUT` | `/api/suscripciones/:id` | Actualizar suscripción |
| `DELETE` | `/api/suscripciones/:id` | Eliminar suscripción |

### Ejemplos de Respuestas

**GET /api/suscripciones**
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "fecha_registro": "2025-11-07T18:30:00.000Z",
    "activo": 1
  }
]
```

**POST /api/suscripciones** (Éxito)
```json
{
  "success": true,
  "message": "¡Suscripción exitosa! Gracias por registrarte.",
  "id": 4
}
```

**POST /api/suscripciones** (Error - Email duplicado)
```json
{
  "error": "Este email ya está registrado"
}
```

---

## 🐛 Solución de Problemas

### ❌ **Error: "Cannot connect to MySQL"**

**Causa:** MySQL no está corriendo o credenciales incorrectas

**Solución:**
1. Abrir XAMPP Control Panel
2. Verificar que MySQL esté en **verde** (running)
3. Si no está corriendo, clic en "Start"
4. Verificar credenciales en `config/db.js`

### ❌ **Error: "EADDRINUSE: Port 3000 is already in use"**

**Causa:** El puerto 3000 ya está siendo usado

**Solución:**
```bash
# Opción 1: Matar el proceso en el puerto 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Opción 2: Cambiar el puerto en app.js
const PORT = process.env.PORT || 3001;
```

### ❌ **Error: "Cannot GET /"**

**Causa:** El archivo `index.html` no está en `public/`

**Solución:**
- Mover `index.html` a la carpeta `public/`
- Verificar la ruta en `app.js`:
```javascript
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

### ❌ **Las imágenes no se cargan**

**Causa:** Rutas incorrectas en el HTML

**Solución:**
- Mover todas las imágenes a `public/img/`
- Actualizar rutas en `index.html`:
```html
<!-- Antes -->
<img src="img/cafe.jpg">

<!-- Después (si img está en public/) -->
<img src="/img/cafe.jpg">
```

### ❌ **La tabla de suscripciones no aparece**

**Causa:** El script `crud.js` no está cargando

**Solución:**
1. Verificar que `crud.js` esté en `public/js/`
2. Actualizar la ruta en `index.html`:
```html
<script src="/js/crud.js"></script>
```
3. Abrir la consola del navegador (F12) para ver errores

---

## 📊 Estructura de la Base de Datos

### Tabla: **suscripciones**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT | ID único (auto-increment) |
| `nombre` | VARCHAR(100) | Nombre del suscriptor |
| `email` | VARCHAR(100) | Email (único) |
| `fecha_registro` | TIMESTAMP | Fecha de registro |
| `activo` | BOOLEAN | Estado (activo/inactivo) |

---

## 🔒 Seguridad

- ✅ Validación de datos en frontend y backend
- ✅ Uso de prepared statements (previene SQL Injection)
- ✅ Escape de HTML (previene XSS)
- ✅ Validación de formato de email
- ✅ Manejo de errores sin exponer información sensible

---

## 📝 Scripts Disponibles

```bash
# Iniciar el servidor
npm start

# Iniciar en modo desarrollo (con auto-reload)
npm run dev

# Ejecutar tests (no implementado aún)
npm test
```

---

## 🎯 Actividades del Proyecto Completadas

- ✅ Conexión a base de datos funcional
- ✅ CRUD completo implementado (CREATE, READ, UPDATE, DELETE)
- ✅ Formulario de suscripción funcional
- ✅ Todas las páginas de desarrollo propio (sin enlaces externos)
- ✅ README con instrucciones completas y detalladas
- ✅ Estructura de carpetas organizada y profesional

---

## 👥 Autor

**Luciana Garay**
- GitHub: [@luli17-98](https://github.com/luli17-98)
- Proyecto: [cafeteria_html](https://github.com/luli17-98/cafeteria_html)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 🙏 Agradecimientos

Proyecto desarrollado como trabajo académico para demostrar:
- Desarrollo Full Stack
- Integración Frontend-Backend
- Operaciones CRUD
- Manejo de Base de Datos MySQL

---

## 📞 Soporte

Si encuentras algún problema:

1. **Revisa la sección "Solución de Problemas"** arriba
2. **Verifica que XAMPP esté corriendo**
3. **Revisa la consola del navegador** (F12) para errores de JavaScript
4. **Revisa la terminal del servidor** para errores de Node.js
5. **Abre un issue en GitHub** con detalles del error

---

**¡Disfruta tu sistema de cafetería!** ☕

Made with ❤️ by Luciana Garay