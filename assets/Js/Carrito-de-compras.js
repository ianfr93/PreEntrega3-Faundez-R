document.addEventListener("DOMContentLoaded", function () {
  // Agregar evento click a los botones "Añadir al carro"
  var botonesAgregar = document.querySelectorAll('.price button');
  botonesAgregar.forEach(function (boton) {
    boton.addEventListener('click', function () {
      var producto = boton.closest('.item-group');
      agregarAlCarrito(producto);
    });
  });

  // Agregar evento click al botón "Borrar Venta"
  var btnBorrarVenta = document.getElementById('btnBorrarVenta');
  btnBorrarVenta.addEventListener('click', function () {
    borrarVenta();
  });

  // Función para agregar producto al carrito
  function agregarAlCarrito(producto) {
    var carrito = obtenerCarrito();
    // Obtener información del producto
    var nombreProducto = producto.querySelector('.product-name').textContent;
    var precioProducto = parseFloat(producto.querySelector('.now-price').textContent.replace('$', ''));
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
    historialCompras.innerHTML = ''; // Limpiar el contenido anterior del carrito
    var totalCompra = 0;

    // Crear la tabla para mostrar los productos en el carrito
    var tablaCarrito = document.createElement('table');
    tablaCarrito.classList.add('carrito-table'); // Agregar clase CSS a la tabla
    var cabecera = tablaCarrito.createTHead();
    var filaCabecera = cabecera.insertRow();
    var celdaProducto = filaCabecera.insertCell();
    var celdaCantidad = filaCabecera.insertCell();
    var celdaPrecio = filaCabecera.insertCell();



    // Agregar espacios adicionales entre los textos de las celdas
    celdaProducto.textContent = 'Producto'.padEnd(20, ' ');
    celdaCantidad.textContent = 'Cantidad'.padEnd(20, ' ');
    celdaPrecio.textContent = 'Precio'.padEnd(20, ' ');

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

      celdaNombre.textContent = producto.nombre;
      celdaCantidad.textContent = producto.cantidad;
      celdaPrecio.textContent = '$' + (producto.precio * producto.cantidad).toFixed(2);

      // Calcular el total de la compra
      totalCompra += producto.precio * producto.cantidad;
    });

    historialCompras.appendChild(tablaCarrito);

    // Mostrar el total de la compra
    document.getElementById('totalCompra').textContent = 'Total: $' + totalCompra.toFixed(2);
  }

  // Actualizar la interfaz de usuario con el contenido del carrito al cargar la página
  var carritoActual = obtenerCarrito();
  actualizarCarritoUI(carritoActual);
});