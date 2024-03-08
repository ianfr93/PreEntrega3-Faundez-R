
  let usuarios = [
    { usuario: "usuario1", contraseña: "contraseña1" },
    { usuario: "usuario2", contraseña: "contraseña2" },
    { usuario: "usuario3", contraseña: "contraseña3" },
    { usuario: "usuario4", contraseña: "contraseña4" },
    { usuario: "usuario5", contraseña: "contraseña5" },
    { usuario: "usuario6", contraseña: "contraseña6" }
  ];

  let intentosRestantes = 5;

  // Función para autenticar al usuario
  function autenticarUsuario(event) {
    event.preventDefault();

    let nombreUsuario = document.getElementById("username").value;
    let contraseña = document.getElementById("password").value;

    let usuarioValido = usuarios.find(user => user.usuario === nombreUsuario && user.contraseña === contraseña);

    let mensajeElement = document.getElementById("mensaje");

    if (!usuarioValido) {
      intentosRestantes--;

      if (intentosRestantes > 0) {
        mensajeElement.innerHTML = `Nombre de usuario o contraseña incorrectos. Intentos restantes: ${intentosRestantes}`;
        mensajeElement.className = "error-message";
        mensajeElement.style.display = "block";
      } else {
        mensajeElement.innerHTML = "¡Se han agotado los intentos! Reinicie la sesión para intentar nuevamente.";
        resetForm();
      }
    } else {
      window.location.href = './pages/Menu-de-caja.html';
    }
  }

  // Agregar evento de clic al botón con id "acceso"
document.getElementById("acceso").addEventListener("click", function(event) {
  if (intentosRestantes > 5) {
    autenticarUsuario(event);
  }
});

// Funciones y variables para la pantalla de caja
let empresa;
let caja;
let imprimir;
let tipoDocumento;
let monto;

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

function guardarYRedirigir() {
  if (validarCampos()) {
    alert('Datos válidos. Guardando y redirigiendo desde la pantalla de caja...');
    window.location.href = './dashboard.html';
  }
}

// Resto del código que no ha cambiado
document.addEventListener("DOMContentLoaded", function() {
  // ... (resto del código)
});