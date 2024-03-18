// Carrito-de-compras.js

document.addEventListener("DOMContentLoaded", function() {
  // Agregar evento click a los botones "Añadir al carro"
  var botonesAgregar = document.querySelectorAll('.price button');
  botonesAgregar.forEach(function(boton) {
      boton.addEventListener('click', function() {
          var producto = boton.closest('.item-group');
          agregarAlCarrito(producto);
      });
  });

  // Función para agregar producto al carrito
  function agregarAlCarrito(producto) {
      var carrito = obtenerCarrito();
      // Obtener información del producto
      var nombreProducto = producto.querySelector('.product-name').textContent;
      var precioProducto = producto.querySelector('.now-price').textContent;
      // Crear objeto de producto para agregar al carrito
      var nuevoProducto = {
          nombre: nombreProducto,
          precio: precioProducto
      };
      // Agregar el nuevo producto al carrito
      carrito.push(nuevoProducto);
      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
      // Actualizar la interfaz de usuario con el contenido del carrito
      actualizarCarritoUI(carrito);
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
      carrito.forEach(function(producto) {
          var item = document.createElement('li');
          item.textContent = producto.nombre + ': ' + producto.precio;
          historialCompras.appendChild(item);
          // Calcular el total de la compra
          totalCompra += parseFloat(producto.precio.replace('$', '').replace(',', ''));
      });
      // Mostrar el total de la compra
      document.getElementById('totalCompra').textContent = 'Total: $' + totalCompra.toFixed(2);
  }

  // Actualizar la interfaz de usuario con el contenido del carrito al cargar la página
  var carritoActual = obtenerCarrito();
  actualizarCarritoUI(carritoActual);
});
