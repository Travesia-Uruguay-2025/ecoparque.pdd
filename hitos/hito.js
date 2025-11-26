// --- CARRUSEL (solo swipe + puntos) ---
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

// Mostrar slide
function showSlide(i) {
  track.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));
  currentIndex = i;
}

// --- SWIPE COMPATIBLE CON SAFARI/IPHONE ---
let startX = 0;
let isPointerDown = false;

// Usamos pointer events para compatibilidad universal
track.addEventListener("pointerdown", (e) => {
  isPointerDown = true;
  startX = e.clientX;
});

track.addEventListener("pointermove", (e) => {
  if (!isPointerDown) return;

  const diff = startX - e.clientX;

  if (diff > 50) {
    // Swipe izquierda → siguiente
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    isPointerDown = false;
  } else if (diff < -50) {
    // Swipe derecha → anterior
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    isPointerDown = false;
  }
});

track.addEventListener("pointerup", () => {
  isPointerDown = false;
});

// Por seguridad para Safari
track.addEventListener("touchmove", (e) => {
  e.preventDefault();
}, { passive: false });

// --- CLIC EN PUNTOS ---
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
  });
});

// Slide inicial
showSlide(0);