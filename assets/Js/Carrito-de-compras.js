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
      var nombreProducto = producto.querySelector('.product-name');
      var precioProducto = producto.querySelector('.now-price');
      if (nombreProducto && precioProducto) {
          nombreProducto = nombreProducto.textContent;
          precioProducto = parseFloat(precioProducto.textContent.replace('$', ''));
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

          carrito.forEach(function (producto) {
              // Crear elementos para mostrar el producto en el carrito
              var li = document.createElement('li');
              li.textContent = producto.nombre + ' - Cantidad: ';

              var spanCantidad = document.createElement('span');
              spanCantidad.textContent = producto.cantidad;
              li.appendChild(spanCantidad);

              // Botón de aumento de cantidad
              var btnAumentar = document.createElement('button');
              btnAumentar.textContent = '+';
              btnAumentar.addEventListener('click', function () {
                  aumentarCantidad(producto);
              });
              li.appendChild(btnAumentar);

              // Botón de disminución de cantidad
              var btnDisminuir = document.createElement('button');
              btnDisminuir.textContent = '-';
              btnDisminuir.addEventListener('click', function () {
                  disminuirCantidad(producto);
              });
              li.appendChild(btnDisminuir);

              // Botón de eliminar producto
              var btnEliminar = document.createElement('button');
              btnEliminar.textContent = '🗑️';
              btnEliminar.addEventListener('click', function () {
                  eliminarProducto(producto);
              });
              li.appendChild(btnEliminar);

              // Precio del producto
              var precioProducto = '$' + (producto.precio * producto.cantidad).toFixed(2);
              li.appendChild(document.createTextNode(' - Precio: ' + precioProducto));

              historialCompras.appendChild(li);

              // Calcular el total de la compra
              totalCompra += producto.precio * producto.cantidad;
          });

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

  // Función para aumentar la cantidad de un producto en el carrito
  function aumentarCantidad(producto) {
      producto.cantidad++;
      actualizarCarritoUI(obtenerCarrito());
  }

  // Función para disminuir la cantidad de un producto en el carrito
  function disminuirCantidad(producto) {
      if (producto.cantidad > 1) {
          producto.cantidad--;
          actualizarCarritoUI(obtenerCarrito());
      }
  }

  // Función para eliminar un producto del carrito
  function eliminarProducto(producto) {
      var carrito = obtenerCarrito();
      var index = carrito.indexOf(producto);
      if (index !== -1) {
          carrito.splice(index, 1);
          localStorage.setItem('carrito', JSON.stringify(carrito));
          actualizarCarritoUI(carrito);
      }
  }

  // Actualizar la interfaz de usuario con el contenido del carrito al cargar la página
  var carritoActual = obtenerCarrito();
  actualizarCarritoUI(carritoActual);
});
