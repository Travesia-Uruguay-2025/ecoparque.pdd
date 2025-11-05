// --- Menú desplegable ---
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

// Alterna el menú y la animación del ícono hamburguesa
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuBtn.classList.toggle("active"); // activa la animación del botón
});

// --- Carrusel automático con fade ---
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;
let interval;

function showSlide(i) {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === i);
    dots[index].classList.toggle("active", index === i);
  });
  currentIndex = i;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function startAutoSlide() {
  interval = setInterval(nextSlide, 4000);
}

document.querySelector(".next").addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

document.querySelector(".prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
  resetAutoSlide();
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
    resetAutoSlide();
  });
});

function resetAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

showSlide(0);
startAutoSlide();

// --- Animación GIFs al hacer scroll ---
const gifLeft = document.querySelector(".gif-left");
const gifRight = document.querySelector(".gif-right");

window.addEventListener("scroll", () => {
  const section = document.querySelector(".gif-section");
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    if (gifLeft) gifLeft.classList.add("show-left");
    if (gifRight) gifRight.classList.add("show-right");
  }
});