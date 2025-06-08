const tareasLux = {
  'Oficina administrativa': 300,
  'Comedor y Cocina': 200,
  'Producción': 300,
  'Baño': 100,
  'Depósito y Producción': 300,
  'Depósito y Despacho': 150
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

  if (!sector || !tarea || !promedio || !resultado) {
    alert('Por favor complete todos los datos antes de guardar.');
    return;
  }

  const historial = JSON.parse(localStorage.getItem('historialLux')) || [];
  historial.push({ fecha, sector, tarea, promedio, cumple: resultado });
  localStorage.setItem('historialLux', JSON.stringify(historial));
  mostrarHistorial();
}

function mostrarHistorial() {
  const tabla = document.querySelector('#tablaHistorial tbody');
  if (!tabla) return;
  tabla.innerHTML = '';
  const datos = JSON.parse(localStorage.getItem('historialLux')) || [];

  datos.slice().reverse().forEach((d, indexReverso) => {
    const row = document.createElement('tr');

    const indexReal = datos.length - 1 - indexReverso;

    row.innerHTML = `
      <td>${d.fecha}</td>
      <td>${d.sector}</td>
      <td>${d.tarea}</td>
      <td>${d.promedio}</td>
      <td>${d.cumple}</td>
      <td><button class="btn-eliminar" data-index="${indexReal}">Eliminar</button></td>
    `;

    tabla.appendChild(row);
  });

  // Listeners botones eliminar
  const botonesEliminar = tabla.querySelectorAll('.btn-eliminar');
  botonesEliminar.forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'), 10);
      eliminarHistorial(index);
    });
  });
}

function eliminarHistorial(index) {
  const datos = JSON.parse(localStorage.getItem('historialLux')) || [];
  if (index >= 0 && index < datos.length) {
    const confirmar = confirm('¿Está seguro que desea eliminar este registro del historial?');
    if (confirmar) {
      datos.splice(index, 1);
      localStorage.setItem('historialLux', JSON.stringify(datos));
      mostrarHistorial();
    }
  }
}

function prepararImpresion() {
  document.getElementById('fechaEmision').textContent = new Date().toLocaleDateString();

  document.getElementById('empresaRazon').textContent = document.getElementById('razon').value;
  document.getElementById('empresaDireccion').textContent = document.getElementById('direccion').value;
  document.getElementById('empresaLocalidad').textContent = document.getElementById('localidad').value;
  document.getElementById('empresaProvincia').textContent = document.getElementById('provincia').value;
  document.getElementById('empresaCUIT').textContent = document.getElementById('cuit').value;

  document.getElementById('tecnicoSector').textContent = document.getElementById('sector').value;
  document.getElementById('tecnicoTarea').textContent = document.getElementById('tarea').value;
  document.getElementById('tecnicoLuxMin').textContent = document.getElementById('luxMin').value;
  document.getElementById('tecnicoArea').textContent = document.getElementById('area').value;
  document.getElementById('tecnicoPromedio').textContent = document.getElementById('promedio').value;
  document.getElementById('tecnicoResultado').textContent = document.getElementById('resultadoLux').textContent;
  document.getElementById('tecnicoObservaciones').textContent = document.getElementById('observaciones').value;

  const responsableValor = document.getElementById('responsable').value || '(No completado)';
  document.getElementById('responsableNombrePrint').textContent = responsableValor;

  window.print();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('tarea').addEventListener('change', setLuxMinimo);
  mostrarHistorial();
});
