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

// --- Swipe táctil ---
let startX = 0;
let isDragging = false;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  let touchX = e.touches[0].clientX;
  let diff = startX - touchX;

  if (diff > 50) {
    // Swipe izquierda → siguiente
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    isDragging = false;
  } else if (diff < -50) {
    // Swipe derecha → anterior
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    isDragging = false;
  }
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