// --- BOTÓN MENÚ DESPLEGABLE ---
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("show");
});

// --- MAPA (mostrar / ocultar) ---
const mapToggle = document.querySelector(".map-toggle");
const mapContent = document.querySelector(".map-content");

if (mapToggle) {
  mapToggle.addEventListener("click", () => {
    mapContent.style.display = mapContent.style.display === "block" ? "none" : "block";
  });
}

// --- CARRUSEL AUTOMÁTICO ---
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

function showSlide(i) {
  track.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));
  currentIndex = i;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

let interval = setInterval(nextSlide, 4000);

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
    clearInterval(interval);
    interval = setInterval(nextSlide, 4000);
  });
});

showSlide(0);