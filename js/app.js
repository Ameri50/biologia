document.addEventListener("DOMContentLoaded", function () {
    let preguntaActual = null;
    const preguntas = [
        { pregunta: "¿Qué estructura celular es responsable de la producción de energía?", respuesta: "Mitocondria" },
        { pregunta: "¿Qué molécula lleva la información genética en la célula?", respuesta: "ADN" },
        { pregunta: "¿Qué proceso convierte la energía solar en química?", respuesta: "Fotosíntesis" },
        { pregunta: "¿Cuáles son los principales tipos de células?", respuesta: "Procariotas y eucariotas" }
    ];

    // Función para generar una nueva pregunta aleatoria
    function generarPregunta() {
        const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
        preguntaActual = preguntas[indiceAleatorio];
        document.getElementById("pregunta").innerText = preguntaActual.pregunta;
        document.getElementById("respuesta").innerText = "";
        document.getElementById("input-respuesta").value = "";
    }

    // Evento para generar una nueva pregunta
    document.getElementById("generar-pregunta").addEventListener("click", generarPregunta);

    // Función para verificar la respuesta
    document.getElementById("verificar-respuesta").addEventListener("click", function () {
        const inputRespuesta = document.getElementById("input-respuesta").value.trim().toLowerCase();
        const respuestaCorrecta = preguntaActual ? preguntaActual.respuesta.toLowerCase() : "";
        
        if (inputRespuesta === respuestaCorrecta) {
            document.getElementById("respuesta").innerText = "¡Correcto!";
        } else {
            document.getElementById("respuesta").innerText = "Incorrecto. La respuesta correcta es: " + preguntaActual.respuesta;
        }
    });

    // Función para buscar una respuesta del sistema según la pregunta del usuario
    document.getElementById("buscar-respuesta").addEventListener("click", function () {
        const preguntaUsuario = document.getElementById("pregunta-usuario").value.trim().toLowerCase();
        let respuestaSistema = "";

        if (preguntaUsuario.includes("vida")) {
            respuestaSistema = "La célula es la unidad básica de la vida.";
        } else if (preguntaUsuario.includes("adn")) {
            respuestaSistema = "El ADN contiene la información genética.";
        } else if (preguntaUsuario.includes("energía")) {
            respuestaSistema = "La fotosíntesis convierte la luz solar en energía.";
        } else {
            respuestaSistema = "Lo siento, no tengo una respuesta para esa pregunta.";
        }

        document.getElementById("respuesta-usuario").innerText = respuestaSistema;
    });

    // Función para activar o desactivar el modo oscuro
    document.getElementById("modo-btn").addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            document.getElementById("modo-btn").innerText = "Modo Claro";
        } else {
            document.getElementById("modo-btn").innerText = "Modo Oscuro";
        }
    });
});
