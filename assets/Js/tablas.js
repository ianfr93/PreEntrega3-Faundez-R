
document.addEventListener('DOMContentLoaded', function () {
    function obtenerProductoPorId(productId) {
        return productos.find(producto => producto.id === parseInt(productId));
    }

    const tablaProductos = document.getElementById('tablaProductos');

    function cargarProductos() {
        productos.forEach(function (producto) {
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

   // Función para actualizar el stock de un producto
function actualizarStock(nombreProducto, cantidad) {
    const filaProducto = document.getElementById(`producto${nombreProducto}`);
    if (filaProducto) {
        const celdaCantidad = filaProducto.querySelector('td:nth-child(3)');
        if (celdaCantidad) {
            const stockActual = parseInt(celdaCantidad.textContent);
            const nuevoStock = stockActual - cantidad;
            celdaCantidad.textContent = nuevoStock;
        }
    }
}
});

