// public/crud.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formSuscripcion');
  const tablaBody = document.querySelector('#tabla-suscripciones tbody');

  // Cargar y renderizar suscripciones
  async function cargarSuscripciones() {
    try {
      const res = await fetch('/api/suscripciones');
      const data = await res.json();
      tablaBody.innerHTML = '';
      data.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${s.id}</td>
          <td>${escapeHtml(s.nombre || '')}</td>
          <td>${escapeHtml(s.email || '')}</td>
          <td>
            <button class="btn-edit" data-id="${s.id}" data-nombre="${escapeHtmlAttr(s.nombre || '')}" data-email="${escapeHtmlAttr(s.email || '')}">Editar</button>
            <button class="btn-delete" data-id="${s.id}">Eliminar</button>
          </td>
        `;
        tablaBody.appendChild(tr);
      });
      attachButtons();
    } catch (err) {
      console.error('Error cargando suscripciones', err);
    }
  }

  // Enviar nueva suscripción (CREATE)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch('/api/suscripciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      const result = await res.json();
      alert(result.message || 'Suscripción agregada');
      form.reset();
      cargarSuscripciones();
    } catch (err) {
      console.error(err);
      alert('Error al guardar');
    }
  });

  // Adjuntar listeners a botones Edit / Delete
  function attachButtons() {
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        if (!confirm('¿Eliminar esta suscripción?')) return;
        try {
          const res = await fetch(`/api/suscripciones/${id}`, { method: 'DELETE' });
          const r = await res.json();
          alert(r.message || 'Eliminado');
          cargarSuscripciones();
        } catch (err) {
          console.error(err);
          alert('Error al eliminar');
        }
      });
    });

    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const nombre = btn.dataset.nombre;
        const email = btn.dataset.email;

        // Alternativa simple: pedir nuevos datos por prompt
        const nuevoNombre = prompt('Nombre:', nombre);
        if (nuevoNombre === null) return; // cancelar
        const nuevoEmail = prompt('Email:', email);
        if (nuevoEmail === null) return;

        try {
          const res = await fetch(`/api/suscripciones/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nuevoNombre, email: nuevoEmail })
          });
          const r = await res.json();
          alert(r.message || 'Actualizado');
          cargarSuscripciones();
        } catch (err) {
          console.error(err);
          alert('Error al actualizar');
        }
      });
    });
  }

  // Helpers para seguridad básica (evitar inyección en HTML)
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (s) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s];
    });
  }
  function escapeHtmlAttr(str) {
    return String(str).replace(/["']/g, function (s) {
      return (s === '"' ? '&quot;' : '&#39;');
    });
  }

  // Primera carga
  cargarSuscripciones();
});
