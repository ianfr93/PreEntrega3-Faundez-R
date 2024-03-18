document.addEventListener("DOMContentLoaded", function() {
  // Agregar evento click al botón de buscar
  var btnBuscar = document.getElementById('btnBuscar');
  btnBuscar.addEventListener('click', function() {
      buscar();
  });
  // Agregar evento click a los botones de agregar producto
  var botonesAgregar = document.querySelectorAll('.btn-primary');
  botonesAgregar.forEach(function(boton) {
      boton.addEventListener('click', function() {
          agregarAlCarrito(boton.getAttribute('data-product-id'));
      });
  });

  // Función para buscar productos
function buscar() {
  var inputBusqueda = document.getElementById('searchInput').value.toLowerCase();
  var productos = document.querySelectorAll('.item-group');
  
  productos.forEach(function(producto) {
      var nombreProductoElemento = producto.querySelector('.item');
      if (nombreProductoElemento) {
          var nombreProducto = nombreProductoElemento.textContent.toLowerCase();
          var idProducto = producto.getAttribute('id');
          var categoriaProducto = producto.getAttribute('data-category').toLowerCase();
          
          // Verificar si la búsqueda coincide con el nombre, ID o categoría del producto
          if (nombreProducto.includes(inputBusqueda) || idProducto === inputBusqueda || categoriaProducto.includes(inputBusqueda)) {
              // Si hay coincidencia, mostrar el producto
              producto.style.display = 'block';
          } else {
              // Si no hay coincidencia, ocultar el producto
              producto.style.display = 'none';
          }
      }
  });
}

  // Función para agregar producto al carrito
  function agregarAlCarrito(idProducto) {
      var carrito = obtenerCarrito();
      // Aquí puedes implementar la lógica para agregar el producto al carrito
      // Por ejemplo, buscar el producto por su ID y agregarlo al array de productos en el carrito
      // No puedo proporcionar el código exacto sin saber la estructura de tu carrito
      // Después de agregar el producto, actualiza el carrito en el localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
      // Actualizar la visualización del carrito en la interfaz de usuario
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

  // Función para actualizar la visualización del carrito en la interfaz de usuario
  function actualizarCarritoUI(carrito) {
      // Aquí puedes actualizar la interfaz de usuario para mostrar los productos en el carrito
      // Por ejemplo, actualizando el contenido del elemento con id 'historialCompras' con los productos del carrito
  }

  // Función para calcular el precio final con el IVA de Chile
  function calcularPrecioConIVA(precio) {
      // Supongamos que el IVA en Chile es del 19%
      var iva = 0.19;
      var precioConIVA = precio * (1 + iva);
      return precioConIVA;
  }
});
