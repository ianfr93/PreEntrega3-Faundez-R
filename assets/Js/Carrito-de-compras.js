
const IVA_CHILE = 0.19; // Tasa de IVA en Chile (19%)

// Función para escuchar el evento de agregar producto al carrito
function escucharAgregar(Producto) {
  const btnComprar = document.getElementById(`btnComprar-${Producto.nombre.toLowerCase()}`);
  const slcStock = document.getElementById(`${Producto.nombre}-cantidad`);
  btnComprar.addEventListener('click', (e) => {
    e.preventDefault();
    const cantidad = slcStock.value;
    if (log) {
      agregarAlCarrito(Producto, cantidad, Producto.precio);
    } else {
      alert('Debe logearse primero.');
    }
  });
}

// Función para agregar producto al carrito
function agregarAlCarrito(Producto, cantidad, precio) {
  if (validarStock(Producto)) {
    // Calcular el precio total, incluyendo el IVA
    const precioConIVA = precio * (1 + IVA_CHILE);
    const prod = carrito.find(item => item.Producto.toLowerCase() === Producto.nombre.toLowerCase());
    if (!prod) {
      carrito.push({ Producto: Producto.nombre, Precio: precioConIVA, Unidades: parseInt(cantidad) });
      restarStock(cantidad, Producto);
      imprimeCarrito();
      modificarStockYHtml(Producto, Producto.stock, Producto.nombre);
    } else if (validarStock(Producto)) {
      prod.Unidades += parseInt(cantidad);
      restarStock(cantidad, Producto);
      modificarStockYHtml(Producto, Producto.stock, Producto.nombre);
      const contUnidades = document.getElementById(`${prod.Producto}-unidades`);
      const nuevasUnidades = `<p>Unidades seleccionadas: ${prod.Unidades}</p>`;
      contUnidades.innerHTML = nuevasUnidades;
    }
    totalAPagar(carrito);
    carritoALocal(carrito);
    return carrito;
  }
}

// Función para guardar el carrito en el almacenamiento local
function carritoALocal(carrito) {
  const prodEnJson = JSON.stringify(carrito);
  localStorage.setItem('carrito', prodEnJson);
}

// Función para cargar el carrito desde el almacenamiento local
function cargarCarritoDesdeLocal() {
  const carritoDesdeLocal = localStorage.getItem('carrito');
  if (carritoDesdeLocal) {
    const carritoLocal = JSON.parse(carritoDesdeLocal);
    carritoLocal.forEach(producto => {
      const contCarrito = document.getElementById('carrito');
      const listaCreada = document.createElement('li');
      listaCreada.classList.add(`${producto.Producto}-li`);
      listaCreada.innerHTML = crearCarritoHtml(producto);
      contCarrito.append(listaCreada);
      totalAPagar(carritoLocal);
      eliminarProducto(producto);
    });
  }
}

// Función para validar el stock del producto
function validarStock(producto) {
  if (producto.stock <= 0) {
    alert(`Lo lamento, no tenemos más unidades de ${producto.nombre}`);
    return false;
  } else {
    return true;
  }
}

// Función para restar el stock del producto
function restarStock(cantidad, Producto) {
  const productoEncontrado = obtenerProducto(Producto.nombre);
  if (productoEncontrado && productoEncontrado.stock >= parseInt(cantidad)) {
    productoEncontrado.stock -= parseInt(cantidad);
  }
}

// Función para imprimir el carrito en el HTML
function imprimeCarrito() {
  const ultimo = carrito[carrito.length - 1];
  const contCarrito = document.getElementById('carrito');
  const listaCreada = document.createElement('li');
  listaCreada.classList.add(`${ultimo.Producto}-li`);
  listaCreada.innerHTML = crearCarritoHtml(ultimo);
  contCarrito.append(listaCreada);
  eliminarProducto(ultimo);
}

// Función para calcular el total a pagar
function totalAPagar(carrito) {
  const aPagar = carrito.reduce((total, producto) => total += (producto.Unidades * producto.Precio), 0);
  const parrafo = document.getElementById('total');
  parrafo.innerText = `Total a pagar: $${aPagar.toFixed(2)}`;
  return aPagar;
}

// Función para crear el HTML del carrito
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

// Función para eliminar un producto del carrito
function eliminarProducto(Producto) {
  const btnBorrar = document.getElementById(`btnBorrar-${Producto.Producto.toLowerCase()}`);
  btnBorrar.addEventListener('click', () => {
    const cardCarrito = document.querySelector(`.${Producto.Producto}-li`);
    cardCarrito.remove();
    const eliminado = obtenerProducto(Producto.Producto);
    eliminado.stock += Producto.Unidades;
    carrito.pop(eliminado);
    carritoALocal(carrito);
    modificarStockYHtml(eliminado, eliminado.stock, Producto.Producto);
    totalAPagar(carrito);
  });
}

// Función para limpiar el carrito
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
    const parrafo = document.getElementById("total");
    parrafo.innerText = `Total a pagar: $0.00`;
    localStorage.removeItem("carrito");
    carrito.length = 0;
  });
}

// Función para obtener un producto por su ID
function obtenerProductoPorId(productId) {
  return productos.find(producto => producto.id === parseInt(productId));
}

// Agregar evento click a los botones "Agregar" de cada producto
document.querySelectorAll('.btn-primary').forEach(button => {
  button.addEventListener('click', function() {
    const productId = this.getAttribute('data-product-id');
    const producto = obtenerProductoPorId(productId);
    if (producto) {
      escucharAgregar(producto);
    }
  });
});

// Agregar evento click a los botones "Borrar Producto" del carrito de compras
document.querySelectorAll('[id^="btnBorrar-"]').forEach(button => {
  button.addEventListener('click', function() {
    const productId = this.getAttribute('id').split('-')[1];
    const producto = obtenerProductoPorId(productId);
    if (producto) {
      eliminarProducto(producto);
    }
  });
});

// Llamar a la función cargarCarritoDesdeLocal después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  cargarCarritoDesdeLocal();
});

