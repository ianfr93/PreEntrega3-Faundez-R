document.addEventListener("DOMContentLoaded", function () {
  let usuarios = [
    {
      usuario: "usuario1",
      contraseña: "contraseña1",
      perfil: {
        nombre: "Ian Faúndez Rubio",
        rut: "18408203-9",
        correo: "Ifaundez.a@hotmail.com",
        direccion: "Emiliano Zapata 693",
      },
    },
    {
      usuario: "usuario2",
      contraseña: "contraseña2",
      perfil: {
        nombre: "juan fernandez calvo",
        rut: "13402203-9",
        correo: "juanito.c@hotmail.com",
        direccion: "Santiago,centro",
      },
    },
    {
      usuario: "usuario3",
      contraseña: "contraseña3",
      perfil: {
        nombre: "marcelo rios",
        rut: "10708223-9",
        correo: "Chinorrios@hotmail.com",
        direccion: "lo barnechea las casas 45",
      },
    },
    {
      usuario: "usuario4",
      contraseña: "contraseña4",
      perfil: {
        nombre: "gabriel prieto",
        rut: "11408203-9",
        correo: "Ifaundez.a@hotmail.com",
        direccion: "Nuñoa 456",
      },
    },
    {
      usuario: "usuario5",
      contraseña: "contraseña5",
      perfil: {
        nombre: "luis miguel",
        rut: "11402303-9",
        correo: "luismi.a@hotmail.com",
        direccion: "coquimbo 345",
      },
    },
    {
      usuario: "usuario6",
      contraseña: "contraseña6",
      perfil: {
        nombre: "nicolas massu",
        rut: "13408103-1",
        correo: "nicolas.massu@hotmail.com",
        direccion: "la florida 233",
      },
    },
  ];

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
      // Guardar el usuario autenticado en sessionStorage
      sessionStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioValido));
      // Redirigir al menú de cajas
      window.location.href = './pages/Menu-de-caja.html';
    }
  }

  // Inicializar intentos restantes
  let intentosRestantes = 4; // Cambia este valor según el número deseado de intentos

  // Llama a autenticarUsuario si quedan intentos restantes
  if (intentosRestantes > 0) {
    autenticarUsuario(event);
  }

  // Agrega el evento submit al formulario para llamar a autenticarUsuario
  let loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", autenticarUsuario);
  }

  // Función para reiniciar el formulario
  function resetForm() {
    // Implementa la lógica para reiniciar el formulario si es necesario
  }

  const botonGuardar = document.getElementById("acceso");

  botonGuardar.addEventListener("click", function () {
    guardarYRedirigir();
  });

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
});

