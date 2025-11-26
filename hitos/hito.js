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

// --- CARRUSEL (solo swipe + puntos) ---
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

// Cambiar slide manualmente
function showSlide(i) {
 track.style.transform = `translateX(-${i * 100}%)`;
 dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));
 currentIndex = i;
}

// --- Swipe táctil (Adaptado para Safari/iOS) ---
let startX = 0;
let isDragging = false;

track.addEventListener("touchstart", (e) => {
 startX = e.touches[0].clientX;
 isDragging = true;
});

track.addEventListener("touchmove", (e) => {
 if (!isDragging) return;

 // 🛑 CLAVE: Prevenir el desplazamiento de la página
 e.preventDefault(); 
  
 let touchX = e.touches[0].clientX;
 let diff = startX - touchX;

 // Si la diferencia es mayor a 50 (suficiente arrastre) y no ha terminado el arrastre
 if (isDragging) {
 if (diff > 50) {
 // Swipe izquierda → siguiente
 currentIndex = (currentIndex + 1) % slides.length;
 showSlide(currentIndex);
 isDragging = false; // Detiene el arrastre después de cambiar
 } else if (diff < -50) {
 // Swipe derecha → anterior
 currentIndex = (currentIndex - 1 + slides.length) % slides.length;
 showSlide(currentIndex);
 isDragging = false; // Detiene el arrastre después de cambiar
 }
 }
  
 // Opcional: Para una mejor experiencia, puedes comentar el código anterior 
  // y usar este para que el swipe se haga solo al levantar el dedo (touchend).
  // Sin embargo, el código original ya funciona con los límites de 50px.
});

track.addEventListener("touchend", () => {
 isDragging = false;
});

// --- Click en puntos ---
dots.forEach((dot, i) => {
 dot.addEventListener("click", () => {
 showSlide(i);
 });
});

// Slide inicial
showSlide(0);