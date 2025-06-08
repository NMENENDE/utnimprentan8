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

function generarCamposMedicion() {
  const area = parseFloat(document.getElementById('area').value);
  const contenedor = document.getElementById('medicionesContainer');
  contenedor.innerHTML = '';

  if (!area || area <= 0) return;

  const cantidad = Math.round(Math.sqrt(area));
  for (let i = 1; i <= cantidad; i++) {
    const grupo = document.createElement('div');
    grupo.className = 'form-group';
    const label = document.createElement('label');
    label.textContent = `Medición Lux ${i}:`;
    const input = document.createElement('input');
    input.type = 'number';
    input.id = `luxMed${i}`;
    input.addEventListener('input', calcularPromedio);
    grupo.appendChild(label);
    grupo.appendChild(input);
    contenedor.appendChild(grupo);
  }

  calcularPromedio();
}

function calcularPromedio() {
  const contenedor = document.getElementById('medicionesContainer');
  const inputs = contenedor.querySelectorAll('input');
  let suma = 0;
  let contador = 0;

  inputs.forEach(input => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) {
      suma += val;
      contador++;
    }
  });

  const promedio = contador ? (suma / contador).toFixed(2) : 0;
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

// ✅ FUNCIÓN FINAL: preparar impresión PRO
function prepararImpresion() {
  // Actualizar fecha de emisión
  document.getElementById('fechaEmision').textContent = new Date().toLocaleDateString();

  // Copiar Responsable Técnico a zona de impresión
  const responsableValor = document.getElementById('responsable').value || '(No completado)';
  document.getElementById('responsablePrint').innerHTML = `
    <div><strong>Responsable Técnico</strong></div>
    <div>${responsableValor}</div>
  `;

  // Imprimir
  window.print();
}

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('tarea').addEventListener('change', setLuxMinimo);
  mostrarHistorial();
});
