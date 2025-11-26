// ... (Código del Menú y Mapa sin cambios) ...

// --- BOTÓN MENÚ DESPLEGABLE ---
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
 menuToggle.classList.toggle("open");
 menu.classList.toggle("show");
});

// --- Cerrar menú al clicar un enlace ---
const menuLinks = document.querySelectorAll(".menu a");
menuLinks.forEach(link => {
 link.addEventListener("click", () => {
 if (menu.classList.contains("show")) {
 menu.classList.remove("show");
 menuToggle.classList.remove("open");
 }
 });
});

// --- MAPA (mostrar / ocultar) ---
const mapToggle = document.querySelector(".map-toggle");
const mapContent = document.querySelector(".map-content");

if (mapToggle) {
 mapToggle.addEventListener("click", () => {
 mapContent.style.display = mapContent.style.display === "block" ? "none" : "block";
 });
}

// --- CARRUSEL (solo swipe + puntos - MEJORA PARA IOS) ---
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");
const SWIPE_THRESHOLD = 50; // Mínimo de píxeles para contar como swipe

let currentIndex = 0;
let startX = 0;
let isDragging = false; // Indica si se inició un arrastre
let moved = 0; // Almacena el desplazamiento

// Cambiar slide manualmente
function showSlide(i) {
 track.style.transform = `translateX(-${i * 100}%)`;
 dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));
 currentIndex = i;
}

track.addEventListener("touchstart", (e) => {
 startX = e.touches[0].clientX;
 isDragging = true;
 moved = 0;
});

track.addEventListener("touchmove", (e) => {
 if (!isDragging) return;

 const touchX = e.touches[0].clientX;
 moved = startX - touchX;
 
 // **Opcional, pero recomendado en iOS:** Mueve visualmente el track durante el arrastre
 // Esto ayuda al usuario a sentir que el carrusel es "arrastrable"
 // track.style.transform = `translateX(calc(-${currentIndex * 100}% - ${moved}px))`; 

 // No previene el default aquí, deja que iOS decida si es scroll vertical
 // Si detectamos que el movimiento es claramente horizontal, iOS lo manejará mejor al final.
});

track.addEventListener("touchend", () => {
 if (!isDragging) return;
 isDragging = false;

 // Lógica de cambio de slide al terminar el arrastre (touchend)
 if (moved > SWIPE_THRESHOLD) {
 // Deslizó hacia la izquierda (Next)
 currentIndex = (currentIndex + 1) % slides.length;
 } else if (moved < -SWIPE_THRESHOLD) {
 // Deslizó hacia la derecha (Previous)
 currentIndex = (currentIndex - 1 + slides.length) % slides.length;
 }
 
 // Muestra el slide final basado en el cambio o si no hubo suficiente movimiento
 showSlide(currentIndex);
 
 moved = 0; // Reinicia el desplazamiento para el siguiente swipe
});

// --- Click en puntos ---
dots.forEach((dot, i) => {
 dot.addEventListener("click", () => {
 showSlide(i);
 });
});

// Slide inicial
showSlide(0);