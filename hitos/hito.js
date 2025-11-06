// ====== Sección mapa desplegable ======
const mapToggle = document.querySelector(".map-toggle");
const mapContent = document.querySelector(".map-content");
const arrow = document.querySelector(".arrow");

mapToggle.addEventListener("click", () => {
  if (mapContent.style.display === "block") {
    mapContent.style.display = "none";
    arrow.textContent = "keyboard_arrow_down";
  } else {
    mapContent.style.display = "block";
    arrow.textContent = "keyboard_arrow_up";
  }
});

// ====== Carrusel táctil ======
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const items = Array.from(track.children);
  const dots = document.querySelectorAll(".dot");

  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;
  let currentTranslate = 0;
  let prevTranslate = 0;

  function setSlide(index) {
    // limitar el índice
    if (index < 0) index = 0;
    if (index >= items.length) index = items.length - 1;

    currentIndex = index;
    currentTranslate = -index * 100;
    prevTranslate = currentTranslate; // guarda la posición actual
    track.style.transition = "transform 0.3s ease";
    track.style.transform = `translateX(${currentTranslate}%)`;

    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  // inicio del toque
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.transition = "none"; // sin animación mientras arrastra
  });

  // movimiento táctil (iPhone compatible)
  track.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      e.preventDefault(); // necesario para Safari / iPhone
      const deltaX = e.touches[0].clientX - startX;
      const movePercent = (deltaX / track.offsetWidth) * 100;
      track.style.transform = `translateX(${prevTranslate + movePercent}%)`;
    },
    { passive: false } // clave para que funcione preventDefault() en iPhone
  );

  // final del toque
  track.addEventListener("touchend", (e) => {
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    // umbral de movimiento
    if (deltaX < -50) setSlide(currentIndex + 1);
    else if (deltaX > 50) setSlide(currentIndex - 1);
    else setSlide(currentIndex);
  });

  // Click en los puntos
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => setSlide(i));
  });

  // Inicializar carrusel
  setSlide(0);
});