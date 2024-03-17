document.addEventListener("DOMContentLoaded", function () {
  let usuarios = [{
      usuario: "usuario1",
      contraseña: "contraseña1",
      perfil: {
        nombre: "Ian Faúndez Rubio",
        rut: "18408203-9",
        correo: "Ifaundez.a@hotmail.com",
        direccion: "Emiliano Zapata 693",
      },
    },
    {
      usuario: "usuario2",
      contraseña: "contraseña2",
      perfil: {
        nombre: "juan fernandez calvo",
        rut: "13402203-9",
        correo: "juanito.c@hotmail.com",
        direccion: "Santiago,centro",
      },
    },
    {
      usuario: "usuario3",
      contraseña: "contraseña3",
      perfil: {
        nombre: "marcelo rios",
        rut: "10708223-9",
        correo: "Chinorrios@hotmail.com",
        direccion: "lo barnechea las casas 45",
      },
    },
    {
      usuario: "usuario4",
      contraseña: "contraseña4",
      perfil: {
        nombre: "gabriel prieto",
        rut: "11408203-9",
        correo: "Ifaundez.a@hotmail.com",
        direccion: "Nuñoa 456",
      },
    },
    {
      usuario: "usuario5",
      contraseña: "contraseña5",
      perfil: {
        nombre: "luis miguel",
        rut: "11402303-9",
        correo: "luismi.a@hotmail.com",
        direccion: "coquimbo 345",
      },
    },
    {
      usuario: "usuario6",
      contraseña: "contraseña6",
      perfil: {
        nombre: "nicolas massu",
        rut: "13408103-1",
        correo: "nicolas.massu@hotmail.com",
        direccion: "la florida 233",
      },
    },
  ];

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
