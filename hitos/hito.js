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

// --- MAPA (mostrar / ocultar con animación) ---
const mapToggle = document.querySelector(".map-toggle");
const mapContent = document.querySelector(".map-content");

if (mapToggle) {
  mapToggle.addEventListener("click", () => {
    mapContent.classList.toggle("open");
  });
}

/* -------------------------------------------------
   NUEVO CARRUSEL MEMORIAS (con flechas + puntos)
   ------------------------------------------------- */

const slidesMem = document.querySelectorAll(".memories-slide");
const dotsMem = document.querySelectorAll(".dots .dot");
const btnLeft = document.querySelector(".left-btn");
const btnRight = document.querySelector(".right-btn");

let memIndex = 0;

function showMemory(i) {
  slidesMem.forEach((s, idx) => {
    s.classList.toggle("active", idx === i);
  });

  // Detectar tipo de hito (flora o fauna)
  const isFlora = document.querySelector(".memories-box-flora");
  const activeClass = isFlora ? "active-flora" : "active-fauna";

  dotsMem.forEach((d, idx) => {
    d.classList.remove("active-flora", "active-fauna");
    if (idx === i) d.classList.add(activeClass);
  });

  memIndex = i;
}

if (btnRight) {
  btnRight.addEventListener("click", () => {
    memIndex = (memIndex + 1) % slidesMem.length;
    showMemory(memIndex);
  });
}

if (btnLeft) {
  btnLeft.addEventListener("click", () => {
    memIndex = (memIndex - 1 + slidesMem.length) % slidesMem.length;
    showMemory(memIndex);
  });
}

// Slide inicial
showMemory(0);