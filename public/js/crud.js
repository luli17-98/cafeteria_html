document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formSuscripcion');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();

    if (!nombre || !email) {
      alert('Por favor completá todos los campos.');
      return;
    }

    try {
      const res = await fetch('/api/suscripciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email })
      });

      if (!res.ok) throw new Error('Error al guardar');
      const data = await res.json();
      alert(data.message || 'Suscripción guardada correctamente');
      form.reset();
    } catch (err) {
      console.error('❌ Error al enviar:', err);
      alert('Error al guardar');
    }
  });
});

