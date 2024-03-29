// Función para cargar los datos del usuario desde localStorage
function cargarDatosUsuario() {
    var nombre = localStorage.getItem("nombreUsuario");
    var rut = localStorage.getItem("rutUsuario");
    var correo = localStorage.getItem("correoUsuario");
    var direccion = localStorage.getItem("direccionUsuario");

    // Mostrar los datos en los elementos HTML
    document.getElementById("nombreUsuario").innerText = nombre;
    document.getElementById("rutUsuario").innerText = rut;
    document.getElementById("correoUsuario").innerText = correo;
    document.getElementById("direccionUsuario").innerText = direccion;
}

// Función para guardar los datos del usuario en localStorage
function guardarDatosUsuario() {
    var nombre = document.querySelector('input[name="first_name"]').value;
    var rut = document.querySelector('input[name="last_name"]').value;
    var correo = document.querySelector('input[name="email"]').value;
    var direccion = document.querySelector('input[name="phone"]').value;

    // Guardar los datos en localStorage
    localStorage.setItem("nombreUsuario", nombre);
    localStorage.setItem("rutUsuario", rut);
    localStorage.setItem("correoUsuario", correo);
    localStorage.setItem("direccionUsuario", direccion);
}

// Función para inicializar la página
function inicializar() {
    cargarDatosUsuario();

    // Agregar evento al botón de guardar
    document.getElementById("sendButton").addEventListener("click", function() {
        guardarDatosUsuario();
        cargarDatosUsuario(); // Actualizar la vista con los nuevos datos guardados
    });
}

// Llamar a la función de inicialización cuando la página se carga completamente
window.onload = inicializar;
