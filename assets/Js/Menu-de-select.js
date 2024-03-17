function obtenerValorSelect(idSelect) {
  const selectElement = document.getElementById(idSelect);
  return selectElement.options[selectElement.selectedIndex].text;
}

function validarCampos() {
  empresa = obtenerValorSelect('selectEmpresa');
  caja = obtenerValorSelect('selectCaja');
  imprimir = obtenerValorSelect('selectImprimir');
  tipoDocumento = obtenerValorSelect('selectDocumento');
  monto = parseFloat(document.getElementById('monto').value);

  switch (true) {
      case (empresa === 'Seleccione' || caja === 'Seleccione' || imprimir === 'Seleccione' || tipoDocumento === 'Seleccione'):
          alert('Por favor, seleccione todas las opciones antes de continuar.');
          return false;
      case (monto <= 0 || isNaN(monto)):
          alert('Ingrese un monto válido mayor que cero.');
          return false;
      default:
          return true;
  }
}

// Definición de la función guardarYRedirigir
function guardarYRedirigir() {
  if (validarCampos()) {
      alert('Datos válidos. Guardando y redirigiendo desde la pantalla de caja...');
      window.location.href = './dashboard.html';
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Aquí puedes agregar cualquier otro código que necesites dentro del evento DOMContentLoaded
});




