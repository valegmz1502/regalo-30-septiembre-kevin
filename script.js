/* =========================================================
   PERSONALIZA TU REGALO AQUÍ
========================================================= */

/*
   Para crear un regalo para otro amigo solamente cambia
   estas tres variables.

   NO necesitas modificar el resto del archivo.
*/

const nombre = "Kevin";

const mensaje = `
No sabía qué regalarte este 30 de septiembre, pero sabia que no queria que fueras espectador...
Amigo, tu amistad es un regalo que valoro todos los dias.Tener un amigo como tu es muy valioso.
Eres una muy bonita persona, que siempre me hace reir y me apoya en todo, eres incondicional y eso es algo que no se encuentra todos los dias. Gracias por ser mi amigo, por estar ahi en los buenos y malos momentos, y por hacer que mi vida sea mejor con tu presencia. 
Te quiero muchisimo, nunca dejes de ser esa persona tan especial y bonita con las personas que te rodean. 
Espero que siempre seas feliz y que todos tus sueños se hagan realidad por que te lo mereces.
Hoy celebro tu bonita amistad, espero poder compartir contigo muchos momentos mas y que sigamos juntos apoyandonos, y viviendo y cumpliendo nuestros sueños y metas juntos, siempre te aplaudo por el esfuerzo que haces siempre y por lo mucho que te esfuerzas siempre. eres de admirar.

Que este pequeño carrito y esta rosa azul
te recuerden que siempre hay espacio para
un detalle y unas bonitas palabras para un amigo. 💙
`;

const fraseFinal = "Feliz 30 de septiembre 💙";


/* =========================================================
   ELEMENTOS DE LA PÁGINA
========================================================= */

const inicio = document.getElementById("inicio");
const seccionAuto = document.getElementById("seccionAuto");
const seccionRosa = document.getElementById("seccionRosa");
const seccionMensaje = document.getElementById("seccionMensaje");
const seccionFinal = document.getElementById("seccionFinal");

const btnAbrir = document.getElementById("btnAbrir");
const btnContinuarRosa = document.getElementById("btnContinuarRosa");
const btnContinuarMensaje = document.getElementById("btnContinuarMensaje");
const btnDetalle = document.getElementById("btnDetalle");
const btnReiniciar = document.getElementById("btnReiniciar");

const autoPortada = document.getElementById("autoPortada");

const nombreAmigo = document.getElementById("nombreAmigo");
const textoMensaje = document.getElementById("textoMensaje");
const cursorEscritura = document.getElementById("cursorEscritura");

const fraseFinalTexto = document.getElementById("fraseFinalTexto");

const progresoPuntos = document.querySelectorAll(".progreso-punto");


/* =========================================================
   CONFIGURACIÓN
========================================================= */

let mensajeEscrito = false;
let detalleMostrado = false;


/* =========================================================
   PERSONALIZACIÓN AUTOMÁTICA
========================================================= */

nombreAmigo.textContent = nombre;
fraseFinalTexto.textContent = fraseFinal;


/* =========================================================
   CREAR PARTÍCULAS DEL FONDO
========================================================= */

function crearParticulas() {

    const contenedor = document.getElementById("particulas");

    const cantidad = window.innerWidth <= 600 ? 18 : 35;

    for (let i = 0; i < cantidad; i++) {

        const particula = document.createElement("span");

        particula.classList.add("particula");

        particula.style.left = Math.random() * 100 + "%";

        particula.style.top = Math.random() * 100 + "%";

        particula.style.animationDelay =
            Math.random() * 4 + "s";

        particula.style.animationDuration =
            2 + Math.random() * 4 + "s";

        contenedor.appendChild(particula);
    }
}


/* =========================================================
   CREAR PÉTALOS
========================================================= */

function crearPetalos(idContenedor, cantidad) {

    const contenedor = document.getElementById(idContenedor);

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    for (let i = 0; i < cantidad; i++) {

        const petalo = document.createElement("span");

        petalo.classList.add("petalo-flotante");

        petalo.style.left = Math.random() * 100 + "%";

        petalo.style.setProperty(
            "--movimiento",
            (Math.random() * 180 - 90) + "px"
        );

        petalo.style.animationDuration =
            7 + Math.random() * 8 + "s";

        petalo.style.animationDelay =
            Math.random() * 8 + "s";

        const tamaño = 6 + Math.random() * 8;

        petalo.style.width = tamaño + "px";
        petalo.style.height = tamaño * 1.5 + "px";

        petalo.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        contenedor.appendChild(petalo);
    }
}


/* =========================================================
   CAMBIAR INDICADOR DE PROGRESO
========================================================= */

function actualizarProgreso(numero) {

    progresoPuntos.forEach((punto, indice) => {

        if (indice <= numero) {
            punto.classList.add("activo");
        } else {
            punto.classList.remove("activo");
        }

    });
}


/* =========================================================
   MOSTRAR UNA SECCIÓN
========================================================= */

function mostrarSeccion(seccion, numeroProgreso) {

    const secciones = [
        inicio,
        seccionAuto,
        seccionRosa,
        seccionMensaje,
        seccionFinal
    ];

    secciones.forEach((seccionActual) => {

        if (seccionActual !== seccion) {
            seccionActual.classList.add("oculto");
        }

    });


    seccion.classList.remove("oculto");

    seccion.classList.remove("entrar-seccion");

    /*
       Esto permite volver a ejecutar la animación
       aunque la sección ya se hubiera mostrado.
    */

    void seccion.offsetWidth;

    seccion.classList.add("entrar-seccion");

    actualizarProgreso(numeroProgreso);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   EFECTO DE ESCRITURA
========================================================= */

function escribirMensaje() {

    if (mensajeEscrito) {
        return;
    }

    mensajeEscrito = true;

    textoMensaje.textContent = "";

    cursorEscritura.style.display = "inline-block";


    let posicion = 0;

    /*
       Velocidad de escritura.

       Puedes cambiar 28 por otro número:
       - número menor = más rápido
       - número mayor = más lento
    */

    const velocidad = 28;


    function escribirCaracter() {

        if (posicion < mensaje.length) {

            textoMensaje.textContent += mensaje.charAt(posicion);

            posicion++;

            setTimeout(
                escribirCaracter,
                velocidad
            );

        } else {

            cursorEscritura.style.display = "none";
        }
    }


    escribirCaracter();
}


/* =========================================================
   ABRIR EL REGALO
========================================================= */

btnAbrir.addEventListener("click", function () {

    /*
       El automóvil de la portada comienza a salir.
    */

    autoPortada.classList.add("auto-saliendo");


    /*
       Esperamos un poco para que la animación
       del automóvil pueda verse.
    */

    setTimeout(function () {

        mostrarSeccion(
            seccionAuto,
            1
        );

    }, 1200);

});


/* =========================================================
   IR DEL AUTO A LA ROSA
========================================================= */

btnContinuarRosa.addEventListener("click", function () {

    mostrarSeccion(
        seccionRosa,
        2
    );


    /*
       Creamos los pétalos cuando aparece la sección.
    */

    crearPetalos(
        "petalosRosa",
        window.innerWidth <= 600 ? 9 : 17
    );

});


/* =========================================================
   IR DE LA ROSA AL MENSAJE
========================================================= */

btnContinuarMensaje.addEventListener("click", function () {

    mostrarSeccion(
        seccionMensaje,
        3
    );


    crearPetalos(
        "petalosMensaje",
        window.innerWidth <= 600 ? 7 : 14
    );


    /*
       El mensaje comienza a escribirse
       después de una pequeña pausa.
    */

    setTimeout(function () {

        escribirMensaje();

    }, 700);

});


/* =========================================================
   MOSTRAR EL DETALLE FINAL
========================================================= */

btnDetalle.addEventListener("click", function () {

    if (detalleMostrado) {
        return;
    }

    detalleMostrado = true;


    /*
       Creamos una pequeña lluvia de pétalos.
    */

    crearPetalos(
        "petalosFinal",
        window.innerWidth <= 600 ? 10 : 20
    );


    /*
       Mostramos la pantalla final.
    */

    mostrarSeccion(
        seccionFinal,
        3
    );


    seccionFinal.classList.add("revelar-detalle");

});


/* =========================================================
   VOLVER A EMPEZAR
========================================================= */

btnReiniciar.addEventListener("click", function () {

    /*
       Reiniciamos variables.
    */

    mensajeEscrito = false;
    detalleMostrado = false;


    /*
       Limpiamos el mensaje anterior.
    */

    textoMensaje.textContent = "";

    cursorEscritura.style.display = "inline-block";


    /*
       Quitamos la animación del auto
       para que pueda ejecutarse nuevamente.
    */

    autoPortada.classList.remove("auto-saliendo");


    /*
       Volvemos a la portada.
    */

    mostrarSeccion(
        inicio,
        0
    );

});


/* =========================================================
   SOPORTE PARA TECLADO
========================================================= */

/*
   Si el usuario presiona Escape mientras está en una
   sección, puede volver a la portada.
*/

document.addEventListener("keydown", function (evento) {

    if (evento.key === "Escape") {

        if (!inicio.classList.contains("oculto")) {
            return;
        }

        mensajeEscrito = false;
        detalleMostrado = false;

        textoMensaje.textContent = "";

        autoPortada.classList.remove("auto-saliendo");

        mostrarSeccion(
            inicio,
            0
        );
    }

});


/* =========================================================
   INICIO
========================================================= */

crearParticulas();

actualizarProgreso(0);