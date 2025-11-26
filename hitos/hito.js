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

// --- CARRUSEL SIN AUTOMÁTICO + SWIPE iPhone/Android ---
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function showSlide(i) {
  track.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));
  currentIndex = i;
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => showSlide(i));
});

// --- Swipe táctil compatible con iPhone / Safari ---
let startX = 0;
let startY = 0;
let isDragging = false;
let isHorizontal = false;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  isDragging = true;
  isHorizontal = false;
}, { passive: true });

track.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const touchX = e.touches[0].clientX;
  const touchY = e.touches[0].clientY;
  const diffX = touchX - startX;
  const diffY = touchY - startY;

  // Detectar si el movimiento es horizontal (evitar conflicto con scroll vertical)
  if (!isHorizontal) {
    if (Math.abs(diffX) > Math.abs(diffY)) {
      isHorizontal = true;
    } else {
      isDragging = false;
      return; 
    }
  }

  // Habilitar swipe real en Safari/iPhone
  e.preventDefault();

  // Siguiente
  if (diffX < -50) {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    isDragging = false;
  }

  // Anterior
  else if (diffX > 50) {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    isDragging = false;
  }

}, { passive: false }); // MUY IMPORTANTE para Safari

track.addEventListener("touchend", () => {
  isDragging = false;
});

// Mostrar slide inicial
showSlide(0);