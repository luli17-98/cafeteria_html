/**
 * CRUD Frontend - Tienda de Café
 * Maneja la interacción con la API de suscripciones
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formSuscripcion');
  const tablaBody = document.querySelector('#tabla-suscripciones tbody');

  // ==================== FUNCIONES PRINCIPALES ====================

  /**
   * Cargar y mostrar todas las suscripciones
   */
  async function cargarSuscripciones() {
    try {
      mostrarCargando(true);
      const res = await fetch('/api/suscripciones');
      
      if (!res.ok) {
        throw new Error('Error al cargar suscripciones');
      }
      
      const data = await res.json();
      renderizarTabla(data);
      
    } catch (err) {
      console.error('Error:', err);
      mostrarError('No se pudieron cargar las suscripciones. Verifica que el servidor esté corriendo.');
    } finally {
      mostrarCargando(false);
    }
  }

  /**
   * Renderizar tabla con datos
   */
  function renderizarTabla(suscripciones) {
    tablaBody.innerHTML = '';
    
    if (suscripciones.length === 0) {
      tablaBody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; padding: 20px; color: #999;">
            No hay suscripciones registradas aún
          </td>
        </tr>
      `;
      return;
    }
    
    suscripciones.forEach(s => {
      const tr = document.createElement('tr');
      const fecha = new Date(s.fecha_registro).toLocaleDateString('es-AR');
      
      tr.innerHTML = `
        <td>${s.id}</td>
        <td>${escapeHtml(s.nombre || '')}</td>
        <td>${escapeHtml(s.email || '')}</td>
        <td style="white-space: nowrap;">
          <button class="btn-edit" data-id="${s.id}" 
                  data-nombre="${escapeHtmlAttr(s.nombre || '')}" 
                  data-email="${escapeHtmlAttr(s.email || '')}"
                  title="Editar">
            ✏️ Editar
          </button>
          <button class="btn-delete" data-id="${s.id}" title="Eliminar">
            🗑️ Eliminar
          </button>
        </td>
      `;
      tablaBody.appendChild(tr);
    });
    
    attachButtons();
  }

  /**
   * CREATE - Enviar nueva suscripción
   */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const datos = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim()
    };
    
    // Validación básica
    if (!datos.nombre || !datos.email) {
      mostrarAlerta('Por favor completa todos los campos', 'warning');
      return;
    }
    
    if (!validarEmail(datos.email)) {
      mostrarAlerta('Por favor ingresa un email válido', 'warning');
      return;
    }
    
    try {
      const res = await fetch('/api/suscripciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.error || 'Error al guardar');
      }
      
      mostrarAlerta(result.message || '¡Suscripción exitosa!', 'success');
      form.reset();
      cargarSuscripciones();
      
    } catch (err) {
      console.error('Error:', err);
      mostrarAlerta(err.message, 'error');
    }
  });

  /**
   * Adjuntar event listeners a botones de la tabla
   */
  function attachButtons() {
    // Botones de eliminar
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        
        if (!confirm('¿Estás seguro de eliminar esta suscripción?')) {
          return;
        }
        
        try {
          const res = await fetch(`/api/suscripciones/${id}`, {
            method: 'DELETE'
          });
          
          const result = await res.json();
          
          if (!res.ok) {
            throw new Error(result.error || 'Error al eliminar');
          }
          
          mostrarAlerta(result.message || 'Eliminado correctamente', 'success');
          cargarSuscripciones();
          
        } catch (err) {
          console.error('Error:', err);
          mostrarAlerta(err.message, 'error');
        }
      });
    });

    // Botones de editar
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const nombreActual = btn.dataset.nombre;
        const emailActual = btn.dataset.email;

        // Modal simple con prompts
        const nuevoNombre = prompt('Editar nombre:', nombreActual);
        if (nuevoNombre === null) return; // Cancelado
        
        const nuevoEmail = prompt('Editar email:', emailActual);
        if (nuevoEmail === null) return; // Cancelado

        // Validaciones
        if (!nuevoNombre.trim() || !nuevoEmail.trim()) {
          mostrarAlerta('Nombre y email no pueden estar vacíos', 'warning');
          return;
        }

        if (!validarEmail(nuevoEmail)) {
          mostrarAlerta('Email no válido', 'warning');
          return;
        }

        try {
          const res = await fetch(`/api/suscripciones/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              nombre: nuevoNombre.trim(), 
              email: nuevoEmail.trim() 
            })
          });
          
          const result = await res.json();
          
          if (!res.ok) {
            throw new Error(result.error || 'Error al actualizar');
          }
          
          mostrarAlerta(result.message || 'Actualizado correctamente', 'success');
          cargarSuscripciones();
          
        } catch (err) {
          console.error('Error:', err);
          mostrarAlerta(err.message, 'error');
        }
      });
    });
  }

  // ==================== FUNCIONES AUXILIARES ====================

  /**
   * Escapar HTML para prevenir XSS
   */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Escapar atributos HTML
   */
  function escapeHtmlAttr(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   * Validar formato de email
   */
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Mostrar mensajes de alerta
   */
  function mostrarAlerta(mensaje, tipo = 'info') {
    const colores = {
      success: '#4CAF50',
      error: '#f44336',
      warning: '#ff9800',
      info: '#2196F3'
    };

    const alerta = document.createElement('div');
    alerta.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${colores[tipo]};
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideIn 0.3s ease;
      max-width: 300px;
    `;
    alerta.textContent = mensaje;
    
    document.body.appendChild(alerta);
    
    setTimeout(() => {
      alerta.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => alerta.remove(), 300);
    }, 3000);
  }

  /**
   * Mostrar/ocultar indicador de carga
   */
  function mostrarCargando(mostrar) {
    const indicador = document.getElementById('loading-indicator');
    if (indicador) {
      indicador.style.display = mostrar ? 'block' : 'none';
    }
  }

  /**
   * Mostrar mensaje de error
   */
  function mostrarError(mensaje) {
    tablaBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: 20px; color: #f44336;">
          ⚠️ ${mensaje}
        </td>
      </tr>
    `;
  }

  // ==================== INICIALIZACIÓN ====================

  // Cargar suscripciones al inicio
  cargarSuscripciones();

  // Agregar estilos para animaciones
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    
    .btn-edit, .btn-delete {
      padding: 6px 12px;
      margin: 0 4px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.3s;
    }
    
    .btn-edit {
      background: #2196F3;
      color: white;
    }
    
    .btn-edit:hover {
      background: #1976D2;
    }
    
    .btn-delete {
      background: #f44336;
      color: white;
    }
    
    .btn-delete:hover {
      background: #d32f2f;
    }
  `;
  document.head.appendChild(style);
});