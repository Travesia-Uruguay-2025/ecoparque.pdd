document.addEventListener('DOMContentLoaded', () => {

    // --- 2. FUNCIONALIDAD DEL MAPA DESPLEGABLE (Sin cambios) ---

    const mapToggle = document.querySelector(".map-toggle");
    const mapContent = document.querySelector(".map-content");
    const arrow = document.querySelector(".arrow");

    mapToggle.addEventListener("click", () => {
        mapContent.classList.toggle("map-open");
        if (mapContent.classList.contains("map-open")) {
            arrow.textContent = "keyboard_arrow_up";
            mapToggle.setAttribute("aria-expanded", "true");
        } else {
            arrow.textContent = "keyboard_arrow_down";
            mapToggle.setAttribute("aria-expanded", "false");
        }
    });

// Asegúrate de que este bloque de código está DENTRO de tu document.addEventListener('DOMContentLoaded', ...
// para que todos los elementos existan.

// --- 3. FUNCIONALIDAD DEL CARRUSEL (FINAL) ---
    
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const dots = document.querySelectorAll('.dot');
const carouselContainer = document.querySelector('.carousel'); // Seleccionamos el contenedor principal
    
// Si no hay ítems o solo hay uno, salimos
if (items.length <= 1) {
    if (dots[0]) dots[0].classList.add('active'); 
    return; 
} 

let currentIndex = 0; 
let startX = 0;
let isDragging = false;
let currentTranslate = 0; 

// CALCULO OPTIMIZADO: Usamos el ancho del contenedor principal, que es más seguro.
// Si tu CSS es correcto (min-width: 100% en .carousel-item), el ancho del ítem debe ser igual a este.
const itemWidth = carouselContainer.offsetWidth; 

function setSlide(index) {
    
    // Lógica circular
    if (index < 0) index = items.length - 1; 
    if (index >= items.length) index = 0; 

    currentIndex = index;

    // Calcula la posición en PIXELES (índice * ancho del contenedor)
    currentTranslate = -currentIndex * itemWidth;

    track.style.transform = `translateX(${currentTranslate}px)`;

    // Actualiza los puntos
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
}

// Inicializa al cargar
setSlide(0); 

// --- Eventos Táctiles (Touch Events) ---

track.addEventListener('touchstart', e => {
    e.preventDefault(); 
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.transition = 'none'; 
});

track.addEventListener('touchmove', e => {
    if (!isDragging) return;
    e.preventDefault(); 
    const deltaX = e.touches[0].clientX - startX;
    track.style.transform = `translateX(${currentTranslate + deltaX}px)`;
});

track.addEventListener('touchend', e => {
    isDragging = false;
    track.style.transition = 'transform 0.5s ease-in-out'; 
    
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    // Mantenemos el umbral de 50px
    if (deltaX < -50) setSlide(currentIndex + 1); // Avanza
    else if (deltaX > 50) setSlide(currentIndex - 1); // Retrocede
    else setSlide(currentIndex); // Se queda
});

// Control por puntos
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => setSlide(i));
});
});