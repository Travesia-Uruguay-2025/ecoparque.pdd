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