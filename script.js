// Configuración del canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Configuración del contexto del canvas
ctx.strokeStyle = "#000";  // Color de la línea
ctx.lineWidth = 2;         // Grosor de la línea

let isDrawing = false;

// Rellenar el fondo del canvas con blanco
function fillBackground() {
    ctx.fillStyle = "#FFF"; // Color blanco
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Funciones para manejar el dibujo
function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.moveTo(x, y);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

// Eventos para dispositivos táctiles
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    startDrawing(e.touches[0]);
});

canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    draw(e.touches[0]);
});

canvas.addEventListener("touchend", stopDrawing);

// Eventos para dispositivos con ratón
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Limpiar el lienzo
function clearCanvas() {
    fillBackground(); // Rellena con blanco antes de limpiar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Guardar la firma como imagen y descargarla en el celular
function saveSignature() {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "firma.png";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Rellena el fondo con blanco cuando la página se carga
window.onload = function() {
    fillBackground();
}
