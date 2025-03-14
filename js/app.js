document.addEventListener("DOMContentLoaded", function () {
    const modoBtn = document.getElementById("modo-btn");
    const body = document.body;

    // Función para alternar el modo oscuro
    function toggleModoOscuro() {
        body.classList.toggle("dark-mode");
        const esModoOscuro = body.classList.contains("dark-mode");
        localStorage.setItem("modo", esModoOscuro ? "oscuro" : "claro");
        modoBtn.textContent = esModoOscuro ? "Modo Claro" : "Modo Oscuro";
    }

    // Cargar preferencia de modo
    if (localStorage.getItem("modo") === "oscuro") {
        body.classList.add("dark-mode");
        modoBtn.textContent = "Modo Claro";
    }

    modoBtn.addEventListener("click", toggleModoOscuro);

    // ======= GENERACIÓN DE PREGUNTAS ======= //
    const preguntasRespuestas = [
        { 
            pregunta: "¿Cuál es la unidad básica de la vida?", 
            respuesta: "La célula es la unidad básica de la vida.", 
            keywords: ["unidad", "básica", "vida", "célula"] 
        },
        { 
            pregunta: "¿Qué molécula contiene la información genética?", 
            respuesta: "El ADN contiene la información genética.", 
            keywords: ["molécula", "información", "genética", "ADN"] 
        },
        { 
            pregunta: "¿Cómo se llama el proceso de conversión de luz en energía química en las plantas?", 
            respuesta: "Este proceso se llama fotosíntesis.", 
            keywords: ["proceso", "luz", "energía", "química", "fotosíntesis"] 
        },
        { 
            pregunta: "¿Qué es el ciclo celular y cuáles son sus principales fases?", 
            respuesta: "El ciclo celular es el proceso por el cual las células crecen y se dividen en fases: interfase y mitosis.", 
            keywords: ["ciclo", "celular", "fases", "interfase", "mitosis"] 
        },
        { 
            pregunta: "¿Qué es el Proyecto Genoma Humano y cuáles son sus principales objetivos?", 
            respuesta: "El Proyecto Genoma Humano tenía como objetivo mapear todos los genes humanos.", 
            keywords: ["Proyecto", "Genoma", "Humano", "genes"] 
        },
        { 
            pregunta: "¿Cuáles son las principales amenazas a la biodiversidad y qué medidas se están tomando para conservarla?", 
            respuesta: "Las amenazas incluyen deforestación y cambio climático, y se aplican reservas naturales para su conservación.", 
            keywords: ["biodiversidad", "amenazas", "conservación", "deforestación"] 
        }
    ];

    let ultimaPregunta = null;
    let ultimaPreguntaExtra = null;

    // Generar una pregunta aleatoria distinta a la última
    function generarPregunta() {
        let preguntaAleatoria;
        do {
            let indiceAleatorio = Math.floor(Math.random() * preguntasRespuestas.length);
            preguntaAleatoria = preguntasRespuestas[indiceAleatorio];
        } while (preguntaAleatoria === ultimaPregunta);

        ultimaPregunta = preguntaAleatoria;

        const elementoPregunta = document.getElementById("pregunta");
        const elementoRespuesta = document.getElementById("respuesta");

        elementoPregunta.innerText = preguntaAleatoria.pregunta;
        elementoRespuesta.innerText = ""; // Borra la respuesta anterior

        // Mostrar respuesta al hacer clic en la pregunta
        elementoPregunta.onclick = function () {
            elementoRespuesta.innerText = preguntaAleatoria.respuesta;
        };
    }

    function generarPreguntaExtra() {
        let preguntaAleatoria;
        do {
            let indiceAleatorio = Math.floor(Math.random() * preguntasRespuestas.length);
            preguntaAleatoria = preguntasRespuestas[indiceAleatorio];
        } while (preguntaAleatoria === ultimaPreguntaExtra || preguntaAleatoria === ultimaPregunta);

        ultimaPreguntaExtra = preguntaAleatoria;

        const elementoPregunta = document.getElementById("pregunta-extra");
        const elementoRespuesta = document.getElementById("respuesta-extra");

        elementoPregunta.innerText = preguntaAleatoria.pregunta;
        elementoRespuesta.innerText = ""; // Borra la respuesta anterior

        // Mostrar respuesta al hacer clic en la pregunta
        elementoPregunta.onclick = function () {
            elementoRespuesta.innerText = preguntaAleatoria.respuesta;
        };
    }

    document.getElementById("generar-pregunta").addEventListener("click", generarPregunta);
    document.getElementById("generar-pregunta-extra").addEventListener("click", generarPreguntaExtra);

    // ======= RESPONDER PREGUNTAS DEL USUARIO ======= //
    function normalizarTexto(texto) {
        return texto
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "") // Elimina tildes
            .toLowerCase()
            .replace(/[¿?.,;:]/g, ""); // Elimina signos innecesarios
    }

    function responderPregunta() {
        let inputUsuario = document.getElementById("pregunta-usuario").value.trim();

        if (inputUsuario === "") {
            document.getElementById("respuesta-usuario").innerText = "Por favor, escribe una pregunta.";
            return;
        }

        let inputNormalizado = normalizarTexto(inputUsuario);
        let mejorCoincidencia = null;
        let maxCoincidencias = 0;

        preguntasRespuestas.forEach(entry => {
            let palabrasClave = entry.keywords.map(normalizarTexto);
            let coincidencias = palabrasClave.filter(palabra => inputNormalizado.includes(palabra)).length;

            if (coincidencias > maxCoincidencias) {
                maxCoincidencias = coincidencias;
                mejorCoincidencia = entry;
            }
        });

        document.getElementById("respuesta-usuario").innerText = mejorCoincidencia
            ? mejorCoincidencia.respuesta
            : "No tengo la respuesta exacta, pero puedes intentarlo de otra forma.";
    }

    document.getElementById("buscar-respuesta").addEventListener("click", responderPregunta);
});
