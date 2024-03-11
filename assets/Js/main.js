let usuarios = [{
  usuario: "usuario1",
  contraseña: "contraseña1",
  perfil: {
    nombre: "Ian Faúndez Rubio",
    rut: "18408203-9",
    correo: "Ifaundez.a@hotmail.com",
    direccion: "Emiliano Zapata 693"
  }
},
{
  usuario: "usuario2",
  contraseña: "contraseña2",
  perfil: {
    nombre: "juan fernandez calvo",
    rut: "13402203-9",
    correo: "juanito.c@hotmail.com",
    direccion: "Santiago,centro"
  }
},
{
  usuario: "usuario3",
  contraseña: "contraseña3",
  perfil: {
    nombre: "marcelo rios",
    rut: "10708223-9",
    correo: "Chinorrios@hotmail.com",
    direccion: "lo barnechea las casas 45"
  }
},
{
  usuario: "usuario4",
  contraseña: "contraseña4",
  perfil: {
    nombre: "gabriel prieto",
    rut: "11408203-9",
    correo: "Ifaundez.a@hotmail.com",
    direccion: "Nuñoa 456"
  }
},
{
  usuario: "usuario5",
  contraseña: "contraseña5",
  perfil: {
    nombre: "luis miguel",
    rut: "11402303-9",
    correo: "luismi.a@hotmail.com",
    direccion: "coquimbo 345"
  }
},
{
  usuario: "usuario6",
  contraseña: "contraseña6",
  perfil: {
    nombre: "nicolas massu",
    rut: "13408103-1",
    correo: "nicolas.massu@hotmail.com",
    direccion: "la florida 233"
  }
}
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
document.getElementById("acceso").addEventListener("click", function (event) {
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

 // Función para mostrar el perfil del usuario
 function mostrarPerfilUsuario(usuario) {
  // Establecer valores en los campos del formulario
  $('#contact_form input[name="first_name"]').val(usuario.perfil.nombre);
  $('#contact_form input[name="last_name"]').val(usuario.perfil.rut);
  $('#contact_form input[name="email"]').val(usuario.perfil.correo);
  $('#contact_form input[name="phone"]').val(usuario.perfil.direccion);

  console.log(`Información del perfil para ${usuario.usuario}:`);
  console.log(`Nombre: ${usuario.perfil.nombre}`);
  console.log(`Rut: ${usuario.perfil.rut}`);
  console.log(`Correo: ${usuario.perfil.correo}`);
  console.log(`Dirección: ${usuario.perfil.direccion}`);
  console.log("----------------------------------");

  gestionarCambios();
}

$(document).ready(function () {
  $('#contact_form').bootstrapValidator({
      feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
      },
      live: 'enabled',
      fields: {
          first_name: {
              validators: {
                  notEmpty: {
                      message: 'Please supply your first name'
                  },
                  stringLength: {
                      min: 2,
                      message: 'Please enter at least 2 characters'
                  }
              }
          },
          last_name: {
              validators: {
                  notEmpty: {
                      message: 'Please supply your last name'
                  },
                  stringLength: {
                      min: 2,
                      message: 'Please enter at least 2 characters'
                  }
              }
          },
          email: {
              validators: {
                  notEmpty: {
                      message: 'Please supply your email address'
                  },
                  emailAddress: {
                      message: 'Please supply a valid email address'
                  }
              }
          },
          phone: {
              validators: {
                  notEmpty: {
                      message: 'Please supply your phone number'
                  },
                  phone: {
                      country: 'US',
                      message: 'Please supply a valid phone number with area code'
                  }
              }
          },
      }
  })
  .on('success.form.bv', function (e) {
      // Prevent the default form submission
      e.preventDefault();

      // Show success message
      $('#success_message').slideDown({ opacity: "show" }, "slow");

      // Reset the form
      $('#contact_form').data('bootstrapValidator').resetForm();
  });

  // Handling the button click
  $('#sendButton').on('click', function () {
    // Trigger the form validation
    var validator = $('#contact_form').data('bootstrapValidator');
    validator.validate();

       // Check if the form is valid before submitting
       if (validator.isValid()) {
        // Perform any additional actions or submit the form
        // For now, we'll just log a message to the console
        console.log('Form is valid. Submitting...');
      } else {
        // Handle invalid form
        // You can display error messages or change the styling here
        alert('Form contains validation errors. Please check and correct them.');
      }
  });
});














$(document).ready(function () {

  $('.menu-toggle').click(function () {
    $('.contenedor').toggleClass('ancho-min');

    if (!window.matchMedia('(min-width: 1017px)').matches) {
      /* Cambios cuando alcanzamos el min-width */
      if (!$('.contenedor').hasClass("ancho-min")) {

      } else {

      }
    }
  });

  $('.menu-boton').click(function () {
    $('.menu-nav-seg').toggleClass('open-menu-nav-seg');
    $('.menu-boton i').toggleClass('fa-caret-right');
    $('.menu-boton i').toggleClass('fa-caret-down');
  });

  /*
   * Necesitamos convertirlo en una función.
   * Para aplicar los cambios tanto cuando el documento está listo como cuando cambiamos el tamaño del navegador.
   */

  function mediaSize() {
    /* Establecer el matchMedia 992 + 250*/
    if (window.matchMedia('(min-width: 1017px)').matches) {
      /* Cambios cuando alcanzamos el min-width */
      $('.contenedor').removeClass('ancho-min');

    } else {
      /* Restablecer para cambios de CSS - ¡Aún necesitamos una mejor manera de hacer esto! */
      $('.contenedor').addClass('ancho-min');

    }
  };

  /* Llama a la función */
  mediaSize();
  /* Adjunta la función al escucha de eventos de cambio de tamaño de la ventana */
  window.addEventListener('resize', mediaSize, false);
});


