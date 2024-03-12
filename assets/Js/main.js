document.addEventListener("DOMContentLoaded", function () {
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

  // Función para reiniciar el formulario
  function resetForm() {
    // Implementa la lógica para reiniciar el formulario si es necesario
  }

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

  // Llama a autenticarUsuario si quedan intentos restantes
  if (intentosRestantes > 0) {
    autenticarUsuario(event);
  }

  // Agrega el evento submit al formulario para llamar a autenticarUsuario
  let loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", autenticarUsuario);
  }
});

document.addEventListener("DOMContentLoaded", function () {
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



document.addEventListener("DOMContentLoaded", function () {
  // Definir una variable para el usuario actual (podría ser el primer usuario en este caso)
  let usuarioActual = usuarios[0];

  function mostrarPerfilUsuario(usuario) {
    // Establecer valores en los campos del formulario
    document.getElementById("first_name").value = usuario.perfil.nombre;
    document.getElementById("last_name").value = usuario.perfil.rut;
    document.getElementById("email").value = usuario.perfil.correo;
    document.getElementById("phone").value = usuario.perfil.direccion;

    // Mostrar información en el div del perfil del usuario
    document.getElementById("nombreUsuario").innerText = usuario.perfil.nombre;
    document.getElementById("rutUsuario").innerText = usuario.perfil.rut;
    document.getElementById("correoUsuario").innerText = usuario.perfil.correo;
    document.getElementById("direccionUsuario").innerText = usuario.perfil.direccion;

    console.log(`Información del perfil para ${usuario.usuario}:`);
    console.log(`Nombre: ${usuario.perfil.nombre}`);
    console.log(`Rut: ${usuario.perfil.rut}`);
    console.log(`Correo: ${usuario.perfil.correo}`);
    console.log(`Dirección: ${usuario.perfil.direccion}`);
    console.log("----------------------------------");
  }

  // Llamada a la función mostrarPerfilUsuario con los datos del usuario actual
  mostrarPerfilUsuario(usuarioActual);

  // Configuración del validador de Bootstrap
  const contactForm = document.getElementById('contact_form');
  const validator = new window.BV.BootstrapValidator(contactForm, {
    // ... (Configuración del validador)
  });

  // Manejo del evento de éxito del formulario
  contactForm.addEventListener('success.form.bv', function (e) {
    // Evitar la presentación del formulario por defecto
    e.preventDefault();

    // Mostrar mensaje de éxito
    document.getElementById('success_message').style.display = 'block';

    // Reiniciar el formulario
    validator.resetForm();
  });

  // Manejo del clic en el botón de envío
  document.getElementById('sendButton').addEventListener('click', function () {
    // Disparar la validación del formulario
    validator.validate();

    // Verificar si el formulario es válido antes de enviar
    if (validator.isValid()) {
      // Realizar acciones adicionales o enviar el formulario
      // Por ahora, solo registraremos un mensaje en la consola
      console.log('Form is valid. Submitting...');

      // Agregar aquí la lógica para guardar los cambios o enviar el formulario
    } else {
      // Manejar formulario no válido
      // Puedes mostrar mensajes de error o cambiar el estilo aquí
      alert('Form contains validation errors. Please check and correct them.');
    }
  });

  // Evento para gestionar cambios en el formulario si es necesario
  document.querySelectorAll('#contact_form input').forEach(function (input) {
    input.addEventListener('input', function () {
      // Puedes agregar aquí la lógica para gestionar los cambios si es necesario
      // gestionarCambios();
    });
  });
});




document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.querySelector('.contenedor');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuNavSeg = document.querySelector('.menu-nav-seg');
  const menuBotonI = document.querySelector('.menu-boton i');

  function toggleAnchoMin() {
    contenedor.classList.toggle('ancho-min');

    if (!window.matchMedia('(min-width: 1017px)').matches) {
      /* Cambios cuando alcanzamos el min-width */
      if (!contenedor.classList.contains("ancho-min")) {

      } else {

      }
    }
  }

  menuToggle.addEventListener('click', toggleAnchoMin);

  document.querySelector('.menu-boton').addEventListener('click', function () {
    menuNavSeg.classList.toggle('open-menu-nav-seg');
    menuBotonI.classList.toggle('fa-caret-right');
    menuBotonI.classList.toggle('fa-caret-down');
  });

  function mediaSize() {
    /* Establecer el matchMedia 992 + 250*/
    if (window.matchMedia('(min-width: 1017px)').matches) {
      /* Cambios cuando alcanzamos el min-width */
      contenedor.classList.remove('ancho-min');

    } else {
      /* Restablecer para cambios de CSS - ¡Aún necesitamos una mejor manera de hacer esto! */
      contenedor.classList.add('ancho-min');
    }
  };

  /* Llama a la función */
  mediaSize();
  /* Adjunta la función al escucha de eventos de cambio de tamaño de la ventana */
  window.addEventListener('resize', mediaSize, false);
});






document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.querySelector('.contenedor');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuNavSeg = document.querySelector('.menu-nav-seg');
  const menuBotonI = document.querySelector('.menu-boton i');

  function toggleAnchoMin() {
    contenedor.classList.toggle('ancho-min');

    if (!window.matchMedia('(min-width: 1017px)').matches) {
      /* Cambios cuando alcanzamos el min-width */
      if (!contenedor.classList.contains("ancho-min")) {

      } else {

      }
    }
  }

  menuToggle.addEventListener('click', toggleAnchoMin);

  document.querySelector('.menu-boton').addEventListener('click', function () {
    menuNavSeg.classList.toggle('open-menu-nav-seg');
    menuBotonI.classList.toggle('fa-caret-right');
    menuBotonI.classList.toggle('fa-caret-down');
  });

  function mediaSize() {
    /* Establecer el matchMedia 992 + 250*/
    if (window.matchMedia('(min-width: 1017px)').matches) {
      /* Cambios cuando alcanzamos el min-width */
      contenedor.classList.remove('ancho-min');

    } else {
      /* Restablecer para cambios de CSS - ¡Aún necesitamos una mejor manera de hacer esto! */
      contenedor.classList.add('ancho-min');
    }
  };

  /* Llama a la función */
  mediaSize();
  /* Adjunta la función al escucha de eventos de cambio de tamaño de la ventana */
  window.addEventListener('resize', mediaSize, false);
});
