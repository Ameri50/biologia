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
        pregunta: "¿Qué son los ATP y por qué son fundamentales para los procesos celulares?", 
        respuesta: "El ATP es la principal molécula de almacenamiento de energía en las células.", 
        keywords: ["ATP", "energía", "procesos", "celulares"] 
    },
    { 
        pregunta: "¿Qué es el Proyecto Genoma Humano y cuáles son sus principales objetivos?", 
        respuesta: "El Proyecto Genoma Humano tenía como objetivo mapear todos los genes humanos.", 
        keywords: ["Proyecto", "Genoma", "Humano", "genes"] 
    },
    { 
        pregunta: "¿Cuáles son las principales técnicas de manipulación genética en biotecnología?", 
        respuesta: "Algunas técnicas incluyen CRISPR, clonación y transgénesis.", 
        keywords: ["manipulación", "genética", "biotecnología", "CRISPR"] 
    },
    { 
        pregunta: "¿Qué son los organismos genéticamente modificados (OGM) y qué beneficios y riesgos tienen?", 
        respuesta: "Los OGM son organismos cuyo ADN ha sido alterado para mejorar ciertas características.", 
        keywords: ["OGM", "organismos", "modificados", "ADN"] 
    },
    { 
        pregunta: "¿Cuáles son las principales amenazas a la biodiversidad y qué medidas se están tomando para conservarla?", 
        respuesta: "Las amenazas incluyen deforestación y cambio climático, y se aplican reservas naturales para su conservación.", 
        keywords: ["biodiversidad", "amenazas", "conservación", "deforestación"] 
    }
];

let ultimaPregunta = null;
let ultimaPreguntaExtra = null;

// Genera una pregunta aleatoria distinta a la última generada
function generarPregunta() {
    let preguntaAleatoria;
    do {
        let indiceAleatorio = Math.floor(Math.random() * preguntasRespuestas.length);
        preguntaAleatoria = preguntasRespuestas[indiceAleatorio];
    } while (preguntaAleatoria === ultimaPregunta);

    ultimaPregunta = preguntaAleatoria;

    document.getElementById("pregunta").innerText = preguntaAleatoria.pregunta;
    document.getElementById("respuesta").innerText = ""; // Borra la respuesta anterior

    // Permitir mostrar la respuesta al hacer clic en la pregunta
    document.getElementById("pregunta").onclick = function() {
        document.getElementById("respuesta").innerText = preguntaAleatoria.respuesta;
    };
}

// Genera otra pregunta aleatoria asegurando que sea diferente a la pregunta principal
function generarPreguntaExtra() {
    let preguntaAleatoria;
    do {
        let indiceAleatorio = Math.floor(Math.random() * preguntasRespuestas.length);
        preguntaAleatoria = preguntasRespuestas[indiceAleatorio];
    } while (preguntaAleatoria === ultimaPregunta || preguntaAleatoria === ultimaPreguntaExtra);

    ultimaPreguntaExtra = preguntaAleatoria;

    document.getElementById("pregunta-extra").innerText = preguntaAleatoria.pregunta;
    document.getElementById("respuesta-extra").innerText = ""; // Borra la respuesta anterior

    // Mostrar respuesta al hacer clic
    document.getElementById("pregunta-extra").onclick = function() {
        document.getElementById("respuesta-extra").innerText = preguntaAleatoria.respuesta;
    };
}

// Normaliza texto para mejorar coincidencias
function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "") // Elimina tildes
        .toLowerCase()
        .replace(/[¿?.,;:]/g, ""); // Elimina signos innecesarios
}

// Responde a la pregunta del usuario
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
