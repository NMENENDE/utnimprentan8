const tareasLux = {
  'Oficina administrativa': 300,
  'Depósito': 100,
  'Taller de precisión': 750,
  'Pasillo o circulación': 100,
  'Área de carga y descarga': 150
};

function setLuxMinimo() {
  const tarea = document.getElementById('tarea').value;
  const input = document.getElementById('luxMin');
  if (tareasLux[tarea]) input.value = tareasLux[tarea];
  calcularPromedio();
}

function calcularPromedio() {
  const m1 = parseFloat(document.getElementById('luxMed1').value) || 0;
  const m2 = parseFloat(document.getElementById('luxMed2').value) || 0;
  const m3 = parseFloat(document.getElementById('luxMed3').value) || 0;
  const promedio = ((m1 + m2 + m3) / 3).toFixed(2);
  document.getElementById('promedio').value = promedio;

  const min = parseFloat(document.getElementById('luxMin').value) || 0;
  const resultado = document.getElementById('resultadoLux');

  if (!isNaN(promedio) && promedio > 0) {
    resultado.textContent = promedio >= min ? 'CUMPLE' : 'NO CUMPLE';
    resultado.className = promedio >= min ? 'cumple' : 'nocumple';
  } else {
    resultado.textContent = '';
    resultado.className = '';
  }
}

function guardarDatos() {
  const fecha = new Date().toISOString().split('T')[0];
  const sector = document.getElementById('sector').value;
  const tarea = document.getElementById('tarea').value;
  const promedio = document.getElementById('promedio').value;
  const resultado = document.getElementById('resultadoLux').textContent;

  const historial = JSON.parse(localStorage.getItem('historialLux')) || [];
  historial.push({ fecha, sector, tarea, promedio, cumple: resultado });
  localStorage.setItem('historialLux', JSON.stringify(historial));
  mostrarHistorial();

  const msg = document.getElementById('mensajeGuardado');
  msg.style.display = 'block';
  setTimeout(() => msg.style.display = 'none', 2500);
}

function mostrarHistorial() {
  const tabla = document.querySelector('#tablaHistorial tbody');
  if (!tabla) return;
  tabla.innerHTML = '';
  const datos = JSON.parse(localStorage.getItem('historialLux')) || [];
  datos.slice().reverse().forEach(d => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${d.fecha}</td><td>${d.sector}</td><td>${d.tarea}</td><td>${d.promedio}</td><td>${d.cumple}</td>`;
    tabla.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('tarea').addEventListener('change', setLuxMinimo);
  ['luxMed1', 'luxMed2', 'luxMed3', 'luxMin'].forEach(id => {
    document.getElementById(id).addEventListener('input', calcularPromedio);
  });
  mostrarHistorial();
});
