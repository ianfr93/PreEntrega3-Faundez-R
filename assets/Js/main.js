document.addEventListener("DOMContentLoaded", function () {
  let usuarios = [{
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

  // Función para mostrar el perfil del usuario en pantalla
  function mostrarPerfil(usuario) {
    document.getElementById("nombreUsuario").innerText = usuario.perfil.nombre;
    document.getElementById("rutUsuario").innerText = usuario.perfil.rut;
    document.getElementById("correoUsuario").innerText = usuario.perfil.correo;
    document.getElementById("direccionUsuario").innerText =
      usuario.perfil.direccion;

  }

  // Agrega el evento click al enlace "Ver mi perfil"
const verPerfilLink = document.getElementById("verPerfil");
if (verPerfilLink) {
  verPerfilLink.addEventListener("click", function (event) {
    event.preventDefault();
    // Obtén el índice del usuario desde la URL o de alguna otra manera que necesites
    // En este ejemplo, se asume que solo hay un usuario y se utiliza el índice 0.
    const index = 0; // Cambia esto según tus necesidades
    mostrarPerfil(index);
  });
}




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
// Por ejemplo, para mostrar el perfil del primer usuario en la lista
mostrarPerfil(usuarios[0]);

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

const tablaProductos = document.getElementById('tablaProductos');

class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    vender(cantidad) {
        this.stock -= cantidad;
        return this.precio * cantidad;
    }
}

const productos = [
    new Producto("Aceite Belmont 1lt", 4000, 800),
    new Producto("Coca Cola 3lts", 3000, 500),
    new Producto("Lavalozas Quix 1lt", 2850, 700),
    new Producto("Leche Soprole Chocolate 1lt", 1200, 1200),
    new Producto("Galletas Oreo Chocolate", 850, 80),
    new Producto("Arroz Miraflores Granel", 1600, 980),
    new Producto("Papel Higiénico Suave 4 rollos", 2000, 450),
    new Producto("Manzanas Royal Gala (kg)", 3500, 600),
    new Producto("Jabón Dove 100g", 1200, 250),
    new Producto("Atún en lata 160g", 2500, 560),
];

function cargarProductos() {
    productos.forEach(function(producto) {
        // Añade el producto a la tabla
        const fila = document.createElement('tr');
        const celdaNombre = document.createElement('td');
        const celdaPrecio = document.createElement('td');
        const celdaCantidad = document.createElement('td');

        celdaNombre.textContent = producto.nombre;
        celdaPrecio.textContent = `$${producto.precio.toFixed(2)}`;
        celdaCantidad.textContent = producto.stock;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaPrecio);
        fila.appendChild(celdaCantidad);

        tablaProductos.appendChild(fila);
    });
}

// Llama a la función para cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    cargarProductos();
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