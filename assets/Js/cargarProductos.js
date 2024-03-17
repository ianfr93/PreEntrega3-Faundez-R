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