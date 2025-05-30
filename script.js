body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f7fafd;
  color: #333;
  padding: 20px;
  margin: 0;
}

h1 {
  text-align: center;
  font-size: 2em;
  color: #1a3c5a;
  margin-bottom: 0;
}

p {
  text-align: center;
  font-size: 1.1em;
  color: #5b6e7d;
  margin-top: 4px;
  margin-bottom: 30px;
}

.form-container {
  max-width: 1100px;
  margin: auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  page-break-inside: avoid;
}

.horizontal-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1 1 200px;
  min-width: 200px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
  background: linear-gradient(145deg, #ffffff, #dceeff);
  border: 1px solid #a5c9ea;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08), -2px -2px 6px rgba(255, 255, 255, 0.6);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px;
  border: 1px solid #aacbe1;
  border-radius: 6px;
  background-color: #f0f6ff;
  box-shadow: inset 2px 2px 6px rgba(0,0,0,0.05);
  font-size: 14px;
}

textarea#observaciones {
  min-height: 120px;
  resize: vertical;
}

.fieldset-group {
  margin-bottom: 30px;
  border: 2px solid #b5d2e8;
  border-radius: 10px;
  padding: 20px;
  background-color: #f0f8ff;
  box-shadow: 0 0 10px rgba(106, 140, 175, 0.1);
  page-break-inside: avoid;
}

.fieldset-group legend {
  font-weight: bold;
  padding: 6px 12px;
  font-size: 1.1em;
  color: #ffffff;
  background-color: #6a8caf;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.pdf-button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  background-color: #6a8caf;
  color: white;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.pdf-button:hover {
  transform: scale(1.05);
}

.section-title {
  text-align: center;
  margin-top: 50px;
  font-size: 1.3em;
  color: #375877;
}

.historial-container {
  max-width: 1100px;
  margin: 40px auto;
  text-align: center;
}

#mensajeGuardado {
  display: none;
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

#resultadoLux {
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  padding: 8px 0;
}

#resultadoLux.cumple {
  color: green;
}

#resultadoLux.nocumple {
  color: red;
}

@media print {
  body * {
    visibility: hidden;
  }
  h1, p, .form-container, .form-container * {
    visibility: visible;
  }
  h1, p {
    display: block;
    position: relative;
    page-break-before: auto;
  }
  .form-container {
    position: relative;
    width: 100%;
    padding: 20mm;
    background-color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    box-shadow: none;
  }
  .historial-container,
  .pdf-button,
  #mensajeGuardado {
    display: none !important;
  }
}
