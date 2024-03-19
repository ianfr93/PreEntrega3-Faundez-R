// Función para calcular el total de la venta
function calcularTotal(productos) {
  var total = 0;
  productos.forEach(function(producto) {
    total += producto.precio * producto.cantidad;
  });
  return total;
}

document.addEventListener("DOMContentLoaded", function () {
  // Agregar evento click a los botones "Añadir al carro"
  var botonesAgregar = document.querySelectorAll('.price button');
  botonesAgregar.forEach(function (boton) {
    boton.addEventListener('click', function () {
      var producto = boton.closest('.item-group');
      if (producto) {
        agregarAlCarrito(producto);
      }
    });
  });

  // Agregar evento click al botón "Borrar Venta"
  var btnBorrarVenta = document.getElementById('btnBorrarVenta');
  if (btnBorrarVenta) {
    btnBorrarVenta.addEventListener('click', function () {
      borrarVenta();
    });
  }

  // Función para agregar producto al carrito
  function agregarAlCarrito(producto) {
    var carrito = obtenerCarrito();
    // Obtener información del producto
    var nombreProducto = producto.querySelector('.product-name').textContent;
    var precioProducto = parseFloat(producto.querySelector('.now-price').textContent.replace('$', ''));
    
    // Buscar si el producto ya está en el carrito
    var productoExistente = carrito.find(item => item.nombre === nombreProducto);

    if (productoExistente) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      productoExistente.cantidad += 1;
    } else {
      // Crear objeto de producto para agregar al carrito
      var nuevoProducto = {
        nombre: nombreProducto,
        precio: precioProducto,
        cantidad: 1
      };
      // Agregar el nuevo producto al carrito
      carrito.push(nuevoProducto);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // Actualizar la interfaz de usuario con el contenido del carrito
    actualizarCarritoUI(carrito);
  }

  // Función para eliminar producto del carrito
  function eliminarProductoCarrito(nombreProducto) {
    var carrito = obtenerCarrito();
    var indice = carrito.findIndex(item => item.nombre === nombreProducto);
    if (indice !== -1) {
      carrito.splice(indice, 1); // Eliminar el producto del carrito
      localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito en localStorage
      actualizarCarritoUI(carrito); // Actualizar la interfaz de usuario
    }
  }

  // Función para aumentar la cantidad de un producto en el carrito
  function aumentarCantidad(nombreProducto) {
    var carrito = obtenerCarrito();
    var producto = carrito.find(item => item.nombre === nombreProducto);
    if (producto) {
      producto.cantidad += 1; // Incrementar la cantidad
      localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito en localStorage
      actualizarCarritoUI(carrito); // Actualizar la interfaz de usuario
    }
  }

  // Función para disminuir la cantidad de un producto en el carrito
  function disminuirCantidad(nombreProducto) {
    var carrito = obtenerCarrito();
    var producto = carrito.find(item => item.nombre === nombreProducto);
    if (producto && producto.cantidad > 1) {
      producto.cantidad -= 1; // Decrementar la cantidad
      localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el carrito en localStorage
      actualizarCarritoUI(carrito); // Actualizar la interfaz de usuario
    }
  }

  // Función para borrar toda la venta y limpiar el carrito
  function borrarVenta() {
    // Limpiar el carrito en localStorage
    localStorage.removeItem('carrito');
    // Actualizar la interfaz de usuario para reflejar que el carrito está vacío
    actualizarCarritoUI([]);
  }

  // Función para obtener el carrito del localStorage
  function obtenerCarrito() {
    var carrito = localStorage.getItem('carrito');
    if (!carrito) {
      // Si no hay datos en el localStorage, devolver un array vacío
      return [];
    }
    return JSON.parse(carrito);
  }

  // Función para actualizar la interfaz de usuario con el contenido del carrito
  function actualizarCarritoUI(carrito) {
    var historialCompras = document.getElementById('historialCompras');
    if (historialCompras) {
      historialCompras.innerHTML = ''; // Limpiar el contenido anterior del carrito
      var totalCompra = 0;

      // Crear la tabla para mostrar los productos en el carrito
      var tablaCarrito = document.createElement('table');
      tablaCarrito.classList.add('carrito-table');
      var cabecera = tablaCarrito.createTHead();
      var filaCabecera = cabecera.insertRow();
      var celdaProducto = filaCabecera.insertCell();
      var celdaCantidad = filaCabecera.insertCell();
      var celdaPrecio = filaCabecera.insertCell();
      var celdaEliminar = filaCabecera.insertCell(); // Nueva celda para el botón de eliminar

      // Agregar elementos span para separar visualmente los textos en las celdas
      celdaProducto.innerHTML = '<span>Producto</span>';
      celdaCantidad.innerHTML = '<span>Cantidad</span>';
      celdaPrecio.innerHTML = '<span>Precio</span>';

      var cuerpoTabla = tablaCarrito.createTBody();

      carrito.forEach(function (producto) {
        var filaProducto = cuerpoTabla.insertRow();
        var celdaNombre = filaProducto.insertCell();
        var celdaCantidad = filaProducto.insertCell();
        var celdaPrecio = filaProducto.insertCell();
        var celdaEliminar = filaProducto.insertCell(); // Nueva celda para el botón de eliminar

        celdaNombre.textContent = producto.nombre;

        // Botón de disminuir cantidad
        var botonDisminuir = document.createElement('button');
        botonDisminuir.textContent = '-';
        botonDisminuir.addEventListener('click', function () {
          disminuirCantidad(producto.nombre);
        });
        celdaCantidad.appendChild(botonDisminuir);

        // Mostrar la cantidad
        var spanCantidad = document.createElement('span');
        spanCantidad.textContent = producto.cantidad;
        celdaCantidad.appendChild(spanCantidad);

        // Botón de aumentar cantidad
        var botonAumentar = document.createElement('button');
        botonAumentar.textContent = '+';
        botonAumentar.addEventListener('click', function () {
          aumentarCantidad(producto.nombre);
        });
        celdaCantidad.appendChild(botonAumentar);

        celdaPrecio.textContent = '$' + (producto.precio * producto.cantidad).toFixed(2); // Formatear el precio con dos decimales

        // Ícono de eliminación
        var iconoEliminar = document.createElement('i');
        iconoEliminar.classList.add('fas', 'fa-trash-alt', 'eliminar-icon');
        iconoEliminar.addEventListener('click', function () {
          eliminarProductoCarrito(producto.nombre); // Llamar a la función para eliminar el producto
        });
        celdaEliminar.appendChild(iconoEliminar);

        // Agregar la clase cantidad-buttons a la celda de cantidad
        celdaCantidad.classList.add('cantidad-buttons');

        // Calcular el total de la compra
        totalCompra += producto.precio * producto.cantidad;
      });

      historialCompras.appendChild(tablaCarrito);

      // Mostrar el total de la compra
      var totalCompraElement = document.getElementById('totalCompra');
      if (totalCompraElement) {
        totalCompraElement.textContent = 'Total: $' + totalCompra.toFixed(2);
      }

      // Mostrar el precio total en el botón "Total a pagar"
      var precioTotalElement = document.getElementById('precioTotal');
      if (precioTotalElement) {
        precioTotalElement.textContent = totalCompra.toFixed(2);
      }
    }
  }

  // Agregar evento click al botón "Total a pagar"
  var btnPagar = document.getElementById('btnPagar');
  if (btnPagar) {
    btnPagar.addEventListener('click', function (event) {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

      realizarPago();
    });
  }

  // Función para realizar el pago
function realizarPago() {
  // Aquí puedes agregar la lógica para obtener información de la venta
  var productos = obtenerCarrito(); // Obtener los productos del carrito
  var total = calcularTotal(productos); // Calcular el total de la venta
  
  // Mostrar información de la venta en la consola
  console.log("Venta realizada:");
  console.log("Lista de productos:");
  productos.forEach(function(producto) {
    console.log(producto.nombre + " - Cantidad: " + producto.cantidad + " - Precio unitario: $" + producto.precio.toFixed(2) + " - Total: $" + (producto.precio * producto.cantidad).toFixed(2));
  });
  console.log("Total de la venta: $" + total.toFixed(2));

  // Verificar si el total es igual a 0
  if (total === 0) {
    // Mostrar mensaje de error
    alert('No puedes realizar el pago porque el carrito está vacío.');
  } else {
    // Mostrar mensaje de alerta indicando que el pago se ha realizado con éxito
    alert('Pago realizado con éxito. ¡Gracias por tu compra!');
    
    // Después del pago exitoso, puedes limpiar el carrito si lo deseas
    borrarVenta();
  }
}



});
