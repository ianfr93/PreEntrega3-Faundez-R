// nav.js

document.addEventListener("DOMContentLoaded", function() {
  // Obtener el usuario autenticado desde el almacenamiento local
  const usuarioAutenticado = JSON.parse(sessionStorage.getItem("usuarioAutenticado"));

  // Verificar si hay un usuario autenticado
  if (usuarioAutenticado) {
      // Obtener el nombre del usuario
      const nombreUsuario = usuarioAutenticado.perfil.nombre;

      // Eliminar cualquier otro elemento de lista con la clase "user-dropdown" si existe
      const dropdownExistente = document.querySelector("nav ul li.user-dropdown");
      if (dropdownExistente) {
          dropdownExistente.remove();
      }

      // Crear el nuevo elemento de lista
      const nuevoElementoLista = document.createElement("li");
      nuevoElementoLista.classList.add("user-dropdown");

      // Crear el contenido del nuevo elemento de lista
      nuevoElementoLista.innerHTML = `
          <a href="#" class="dropdown-toggle-user">
              <i class="fas fa-user fa-sm"></i> ${nombreUsuario} <i class="fas fa-caret-down"></i>
          </a>
          <ul class="dropdown-menu-user" style="display: none;">
              <li><a href="./Ver-mi perfil.html">Ver Perfil de Usuario</a></li>
          </ul>
      `;

      // Insertar el nuevo elemento de lista antes del elemento "Cerrar Sesión"
      const cerrarSesionElemento = document.querySelector("nav ul li:last-child");
      cerrarSesionElemento.parentNode.insertBefore(nuevoElementoLista, cerrarSesionElemento);

      // Agregar evento de clic al enlace "dropdown-toggle-user" para mostrar/ocultar el menú desplegable
      const dropdownToggle = nuevoElementoLista.querySelector('.dropdown-toggle-user');
      dropdownToggle.addEventListener('click', function(event) {
          event.preventDefault();
          const dropdownMenu = nuevoElementoLista.querySelector('.dropdown-menu-user');
          dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
      });
  }
});
