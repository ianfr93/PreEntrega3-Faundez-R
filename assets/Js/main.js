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

document.addEventListener('DOMContentLoaded', function () {
  const tablaProductos = document.getElementById('tablaProductos');


  class Producto {
      constructor(id, nombre, precio, stock) {
          this.id = id;  
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
      new Producto(1, "Aceite Belmont 1lt", 4000, 800),
      new Producto(2, "Coca Cola 3lts", 3000, 500),
      new Producto(3, "Lavalozas Quix 1lt", 2850, 700),
      new Producto(4, "Leche Soprole Chocolate 1lt", 1200, 1200),
      new Producto(5, "Galletas Oreo Chocolate", 850, 80),
      new Producto(6, "Arroz Miraflores Granel", 1600, 980),
      new Producto(7, "Papel Higiénico Suave 4 rollos", 2000, 450),
      new Producto(8, "Manzanas Royal Gala (kg)", 3500, 600),
      new Producto(9, "Jabón Dove 100g", 1200, 250),
      new Producto(10, "Atún en lata 160g", 2500, 560),
  ];

  function cargarProductos() {
      productos.forEach(function(producto) {
          const fila = document.createElement('tr');
          fila.id = `producto${producto.id}`;

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

  cargarProductos();  
});


// Llama a la función para cargar productos para categorias
document.addEventListener('DOMContentLoaded', function () {
  const categories = document.querySelectorAll('.category');
  const itemGroups = document.querySelectorAll('.item-group');

  categories.forEach(function (category) {
      category.addEventListener('click', function () {
          // Remueve la clase 'active' de todas las categorías
          categories.forEach(function (c) {
              c.classList.remove('active');
          });

          // Agrega la clase 'active' a la categoría seleccionada
          category.classList.add('active');

          // Filtra los productos según la categoría seleccionada
          const selectedCategory = category.dataset.category;

          itemGroups.forEach(function (group) {
              if (group.id === selectedCategory || selectedCategory === 'todos') {
                  group.style.display = 'block';
              } else {
                  group.style.display = 'none';
              }
          });
      });
  });

  // Muestra inicialmente los productos de la categoría "Aceites"
  const initialCategory = 'aceites';
  categories.forEach(function (category) {
      if (category.dataset.category === initialCategory) {
          category.classList.add('active');
      }
  });

  itemGroups.forEach(function (group) {
      if (group.id === initialCategory) {
          group.style.display = 'block';
      } else {
          group.style.display = 'none';
      }
  });
});


//comprar productos


const IVA_CHILE = 0.19; // Tasa de IVA en Chile (19%)

function escucharAgregar(Producto) {
  const btnComprar = document.getElementById(`btnComprar-${Producto.nombre.toLowerCase()}`),
      slcStock = document.getElementById(`${Producto.nombre}-cantidad`);
  btnComprar.addEventListener('click', (e) => {
      e.preventDefault()
      cantidad = slcStock.value;
      if (log) {
          agregarAlCarrito(Producto, cantidad, Producto.precio);
      } else {
          alert('Debe Logearse primero.')
      }
  });
}

function agregarAlCarrito(Producto, cantidad, precio) {
  if (validarStock(Producto)) {
    // Calcular el precio total, incluyendo el IVA
    const precioConIVA = precio * (1 + IVA_CHILE);
    
    prod = carrito.find(item => item.Producto.toLowerCase() === Producto.nombre.toLowerCase());
    if (!prod) {
        carrito.push({ Producto: Producto.nombre, Precio: precioConIVA, Unidades: parseInt(cantidad) });
        restarStock(cantidad, Producto);
        imprimeCarrito(carrito);
        modificarStockYHtml(Producto, Producto.stock, Producto.nombre);
    } else if (validarStock(Producto)) {
        prod.Unidades += parseInt(cantidad);
        restarStock(cantidad, Producto);
        modificarStockYHtml(Producto, Producto.stock, Producto.nombre);
        const contUnidades = document.getElementById(`${prod.Producto}-unidades`);
        let nuevasUnidades = innerHTML = `<p>Unidades seleccionadas: ${prod.Unidades}</p>`;
        contUnidades.innerHTML = nuevasUnidades;
    }
    totalAPagar(carrito);
    carritoALocal(carrito)
    return carrito
  }
}

function carritoALocal(carrito) {
  const prodEnJson = JSON.stringify(carrito);
  localStorage.setItem('carrito', prodEnJson);
}

function cargarCarritoDesdeLocal() {
  const carritoDesdeLocal = localStorage.getItem('carrito');
  if (carritoDesdeLocal) {
      let carritoLocal = JSON.parse(carritoDesdeLocal);
      carritoLocal.forEach(producto => {
          const contCarrito = document.getElementById('carrito'),
              listaCreada = document.createElement('li');
          listaCreada.classList.add(`${producto.Producto}-li`)
          listaCreada.innerHTML = crearCarritoHtml(producto)
          contCarrito.append(listaCreada)
          totalAPagar(carritoLocal);
          eliminarProducto(producto);
      });
  }
}
cargarCarritoDesdeLocal()

function validarStock(producto) {
  return (producto.stock <= 0) ? ( //utilizacion de operador ternario
      (alert(`Lo lamento, no tenemos más unidades de ${producto.nombre}`)), false
  ) : true;
}


function restarStock(cantidad, Producto) {
  let productoEncontrado = obtenerProducto(Producto.nombre);
  if (productoEncontrado) {
      if (productoEncontrado.stock >= parseInt(cantidad)) {
          productoEncontrado.stock -= parseInt(cantidad);
      }
  }
}

function imprimeCarrito() {
  let ultimo = carrito[carrito.length - 1];
  const contCarrito = document.getElementById('carrito'),
      listaCreada = document.createElement('li');
  listaCreada.classList.add(`${ultimo.Producto}-li`)
  listaCreada.innerHTML = crearCarritoHtml(ultimo)
  contCarrito.append(listaCreada)
  eliminarProducto(ultimo)
}

function totalAPagar(carrito) {
  aPagar = carrito.reduce((total, producto) => total += (producto.Unidades * producto.Precio), 0)
  const parrafo = document.getElementById('total');
  parrafo.innerText = `Total a pagar: $${aPagar.toFixed(2)}`;
  return aPagar
}

crearProductosAlHTML();

function crearCarritoHtml(Producto) {
  // Calcular el precio total con IVA incluido
  const precioTotal = Producto.Precio * (1 + IVA_CHILE);
  
  return `<div id="${Producto.Producto}-cardCarrito" class="cardCarrito">
  <h3>${Producto.Producto.charAt(0).toUpperCase() + Producto.Producto.slice(1)}</h3>
  <p>Precio unitario: $${precioTotal.toFixed(2)}</p>
  <p id="${Producto.Producto.toLowerCase()}-unidades">Unidades seleccionadas: ${Producto.Unidades}</p>
  <div id="${Producto.Producto.toLowerCase()}-contBoton">
      <button id="btnBorrar-${Producto.Producto.toLowerCase()}" class="btnComprar">Borrar Producto</button>
  </div>
</div>`;
}

function eliminarProducto(Producto) {
  const btnBorrar = document.getElementById(`btnBorrar-${Producto.Producto.toLowerCase()}`);
  btnBorrar.addEventListener('click', () => {
      const cardCarrito = document.querySelector(`.${Producto.Producto}-li`);
      cardCarrito.remove();
      let eliminado = obtenerProducto(Producto.Producto);
      eliminado.stock += Producto.Unidades;
      carrito.pop(eliminado);
      carritoALocal(carrito);
      modificarStockYHtml(eliminado, eliminado.stock, Producto.Producto);
      aPagar -= (Producto.Unidades * Producto.Precio);
      const parrafo = document.getElementById('total');
      parrafo.innerText = `Total a pagar: $${aPagar.toFixed(2)}`;
  });
}

function limpiarCarrito(carrito) {
  const btnlimpiar = document.getElementById('btnlim');
  btnlimpiar.addEventListener('click', () => {
      carrito.forEach((producto) => {
          const cardCarrito = document.querySelector(`.${producto.Producto}-li`);
          cardCarrito.remove();
          const productoEncontrado = obtenerProducto(producto.Producto);
          productoEncontrado.stock += producto.Unidades;
          modificarStockYHtml(productoEncontrado, productoEncontrado.stock, producto.Producto);
      });
      aPagar = 0;
      const parrafo = document.getElementById("total");
      parrafo.innerText = `Total a pagar: $${aPagar.toFixed(2)}`;
      localStorage.removeItem("carrito");
      carrito.length = 0;
  });
}

limpiarCarrito(carrito);
