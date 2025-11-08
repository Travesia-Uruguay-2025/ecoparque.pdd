// --- Botón menú hamburguesa ---
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active"); // animación hamburguesa → cruz
  if (menu) menu.classList.toggle("show"); // mostrar/ocultar menú
});

// --- Botón alternativo (por compatibilidad con otras secciones) ---
const menuToggle = document.querySelector(".menu-toggle");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    if (menu) menu.classList.toggle("show");
  });
}

// --- Carrusel automático con fade (sin flechas) ---
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;
let interval;

// Mostrar slide actual
function showSlide(i) {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === i);
    dots[index].classList.toggle("active", index === i);
  });
  currentIndex = i;
}

// Pasar a la siguiente imagen automáticamente
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Iniciar rotación automática
function startAutoSlide() {
  interval = setInterval(nextSlide, 4000); // cada 4 segundos
}

// Reiniciar el intervalo al hacer clic en un punto
function resetAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

// Permitir navegación con puntos
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
    resetAutoSlide();
  });
});

// Inicialización
showSlide(0);
startAutoSlide();

// --- Animación GIFs al hacer scroll ---
const gifLeft = document.querySelector(".gif-left");
const gifRight = document.querySelector(".gif-right");

window.addEventListener("scroll", () => {
  const section = document.querySelector(".gif-section");
  if (!section) return;

  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    if (gifLeft) gifLeft.classList.add("show-left");
    if (gifRight) gifRight.classList.add("show-right");
  }
});

// --- Botón "Ver en Google Maps" ---
// Si quieres efectos adicionales, como animación al hacer click
const botonMapa = document.querySelector(".boton-mapa");

if (botonMapa) {
  botonMapa.addEventListener("click", (e) => {
    console.log("Botón Google Maps clickeado");
    // efecto opcional: animación rápida al hacer click
    botonMapa.style.transform = "scale(0.95)";
    setTimeout(() => {
      botonMapa.style.transform = "";
    }, 150);
  });
}