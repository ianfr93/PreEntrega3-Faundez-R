document.addEventListener("DOMContentLoaded", function () {
  let usuarios = [{ /* Aquí va tu array de usuarios */ }];

  // Función para mostrar el perfil del usuario en pantalla
  function mostrarPerfil(usuario) {
      document.getElementById("nombreUsuario").innerText = usuario.perfil.nombre;
      document.getElementById("rutUsuario").innerText = usuario.perfil.rut;
      document.getElementById("correoUsuario").innerText = usuario.perfil.correo;
      document.getElementById("direccionUsuario").innerText = usuario.perfil.direccion;
  }

  // Obtener la información del usuario autenticado (puede variar según tu aplicación)
  let usuarioAutenticado = obtenerUsuarioAutenticado();

  // Encontrar el perfil del usuario autenticado en el array de usuarios
  let perfilUsuario = usuarios.find(usuario => usuario.usuario === usuarioAutenticado);

  // Mostrar el perfil del usuario en pantalla
  if (perfilUsuario) {
      mostrarPerfil(perfilUsuario);
  } else {
      console.error("Usuario no encontrado");
  }

  // Función para obtener el usuario autenticado (simulada)
  function obtenerUsuarioAutenticado() {
      // Aquí puedes implementar la lógica para obtener el usuario autenticado
      // Por ejemplo, podrías obtenerlo de localStorage, sessionStorage o de una cookie.
      // En este caso, lo simularemos devolviendo un usuario de ejemplo.
      return "usuario1"; // Cambia esto por la lógica real de tu aplicación
  }
});