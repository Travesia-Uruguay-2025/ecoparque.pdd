// Sección mapa desplegable
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

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const items = Array.from(track.children);
  const dots = document.querySelectorAll('.dot');

  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;
  let currentTranslate = 0; // posición acumulada

  function setSlide(index) {
    // Limita el índice a los elementos disponibles
    if (index < 0) index = 0;
    if (index >= items.length) index = items.length - 1;

    currentIndex = index;
    currentTranslate = -index * 100; // porcentaje acumulado
    track.style.transform = `translateX(${currentTranslate}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    // actualiza posición mientras arrastras
    track.style.transform = `translateX(${currentTranslate + (deltaX / track.offsetWidth) * 100}%)`;
  });

  track.addEventListener('touchend', e => {
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX < -50) setSlide(currentIndex + 1); // swipe a la izquierda
    else if (deltaX > 50) setSlide(currentIndex - 1); // swipe a la derecha
    else setSlide(currentIndex); // si no hay suficiente movimiento, vuelve al mismo
  });

  // Agregar función para tocar los dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => setSlide(i));
  });

  setSlide(0); // inicial
});