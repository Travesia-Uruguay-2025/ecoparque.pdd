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

// --- CARRUSEL (Solución Final y Optimizada para iOS/Safari) ---
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");
const SWIPE_THRESHOLD = 50; // Mínimo de píxeles para contar como swipe

let currentIndex = 0;
let startX = 0;
let startY = 0;
let isDragging = false;
let movedX = 0;

// Cambiar slide manualmente
function showSlide(i) {
  // Aseguramos que el índice esté dentro del rango (manejo de loop)
  i = (i + slides.length) % slides.length;
  
  track.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));
  currentIndex = i;
}

track.addEventListener("touchstart", (e) => {
  // Solo si es un solo toque
  if (e.touches.length !== 1) return;
  
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  isDragging = true;
  movedX = 0;
  // Opcional: Deshabilitar temporalmente la transición para arrastre suave
  // track.style.transition = 'none'; 
});

track.addEventListener("touchmove", (e) => {
  if (!isDragging || e.touches.length !== 1) return;

  const touchX = e.touches[0].clientX;
  const touchY = e.touches[0].clientY;
  
  movedX = startX - touchX;
  const movedY = startY - touchY;
  
  // Si el movimiento horizontal es significativamente mayor que el vertical, 
  // prevenimos el scroll vertical de la página para aislar el swipe del carrusel.
  if (Math.abs(movedX) > Math.abs(movedY)) {
    e.preventDefault();
    
    // Opcional: Movimiento visual en tiempo real
    // track.style.transform = `translateX(calc(-${currentIndex * 100}% - ${movedX}px))`;
  }
});

track.addEventListener("touchend", () => {
  if (!isDragging) return;
  isDragging = false;
  // Opcional: Restaurar la transición CSS
  // track.style.transition = 'transform 0.5s ease';

  let newIndex = currentIndex;
  
  // Lógica de cambio de slide
  if (movedX > SWIPE_THRESHOLD) {
    // Deslizó hacia la IZQUIERDA (ir a la siguiente slide: index + 1)
    newIndex = currentIndex + 1;
  } else if (movedX < -SWIPE_THRESHOLD) {
    // Deslizó hacia la DERECHA (ir a la slide anterior: index - 1)
    newIndex = currentIndex - 1;
  }
  
  // Aplicamos el cambio de slide
  showSlide(newIndex);
  
  movedX = 0; // Reinicia el desplazamiento para el siguiente swipe
});

// Manejo de interrupción del gesto (crítico para iOS)
track.addEventListener("touchcancel", () => {
  isDragging = false;
  // Aseguramos que el carrusel vuelva a su posición correcta si el gesto se cancela
  showSlide(currentIndex);
  movedX = 0;
});


// --- Click en puntos ---
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
  });
});

// Slide inicial
showSlide(0);