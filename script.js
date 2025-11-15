// --- Selecciones ---
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");


// --- Toggle del menú hamburguesa ---
if (menuBtn && menu) {
 menuBtn.addEventListener("click", () => {
   menuBtn.classList.toggle("active"); // animación hamburguesa → cruz
   menu.classList.toggle("show"); // mostrar/ocultar menú
 });
}


// --- Cerrar menú al clicar un enlace (útil en mobile) ---
const menuLinks = document.querySelectorAll(".menu a");
menuLinks.forEach(link => {
 link.addEventListener("click", () => {
   if (menu.classList.contains("show")) {
     menu.classList.remove("show");
     menuBtn.classList.remove("active");
   }
 });
});


// --- Activar enlace "activo" según URL actual ---
(function markActiveLink() {
 try {
   const links = document.querySelectorAll(".menu a");
   const currentUrl = window.location.href.split(/[?#]/)[0]; // sin query/hash
   links.forEach(link => {
     const linkUrl = link.href.split(/[?#]/)[0];
     if (linkUrl === currentUrl) {
       link.classList.add("active");
     } else {
       link.classList.remove("active");
     }
   });
 } catch (e) {
   console.warn("Error marcando enlace activo:", e);
 }
})();


// --- Carrusel automático con fade (sin flechas) ---
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;
let interval;


function showSlide(i) {
 if (!slides.length) return;
 slides.forEach((slide, index) => {
   slide.classList.toggle("active", index === i);
   if (dots[index]) dots[index].classList.toggle("active", index === i);
 });
 currentIndex = i;
}


function nextSlide() {
 if (!slides.length) return;
 currentIndex = (currentIndex + 1) % slides.length;
 showSlide(currentIndex);
}


function startAutoSlide() {
 if (!slides.length) return;
 clearInterval(interval);
 interval = setInterval(nextSlide, 4000); // cada 4 segundos
}


function resetAutoSlide() {
 clearInterval(interval);
 startAutoSlide();
}


if (dots.length) {
 dots.forEach((dot, i) => {
   dot.addEventListener("click", () => {
     showSlide(i);
     resetAutoSlide();
   });
 });
}


showSlide(0);
startAutoSlide();


// --- Animación GIFs al hacer scroll (si existen) ---
const gifLeft = document.querySelector(".gif-left");
const gifRight = document.querySelector(".gif-right");


window.addEventListener("scroll", () => {
 const section = document.querySelector(".gif-section");
 if (!section) return;


 const rect = section.getBoundingClientRect();
 if (rect.top < window.innerHeight - 100) {
   if (gifLeft) gifLeft.classList.add("show-left");
   if (gifRight) gifRight.classList.add("show-right");
 }
});


// --- Botón Google Maps (efecto click) ---
const botonMapa = document.querySelector(".boton-mapa");
if (botonMapa) {
 botonMapa.addEventListener("click", () => {
   botonMapa.style.transform = "scale(0.95)";
   setTimeout(() => {
     botonMapa.style.transform = "";
   }, 150);
 });
}


/* --- Scroll por secciones (BOTÓN CIRCULAR) --- */
(function initScrollButton() {
 const scrollBtn = document.querySelector(".scroll-next-btn");
 if (!scrollBtn) return;


 // Definir orden de secciones (consistente con tu HTML)
 const sections = [
   document.querySelector(".carrusel"),
   document.querySelector(".ecoparque"),
   document.querySelector(".gif-section"),
   document.querySelector(".mapa-section"),
   document.querySelector(".final-text")
 ].filter(Boolean); // elimina nulls si falta alguna sección


 if (!sections.length) return;


 // Intentamos iniciar el índice en la sección visible actualmente
 let currentSectionIndex = sections.findIndex(sec => {
   const rect = sec.getBoundingClientRect();
   return rect.top >= 0 && rect.top < window.innerHeight / 2;
 });
 if (currentSectionIndex < 0) currentSectionIndex = 0;


 scrollBtn.addEventListener("click", () => {
   // calcular índice de la sección más centrada actualmente
   const indexNow = sections.findIndex(sec => {
     const rect = sec.getBoundingClientRect();
     const sectionCenter = rect.top + rect.height / 2;
     return Math.abs(sectionCenter - window.innerHeight / 2) < rect.height / 2;
   });
   currentSectionIndex = indexNow >= 0 ? indexNow : currentSectionIndex;


   // avanzar a la siguiente sección (y volver al inicio al terminar)
   currentSectionIndex = (currentSectionIndex + 1) % sections.length;


   sections[currentSectionIndex].scrollIntoView({
     behavior: "smooth",
     block: "center" // centramos la sección verticalmente
   });
 });


 // actualizar currentSectionIndex cuando se hace scroll manualmente
 let scrollTimer;
 window.addEventListener("scroll", () => {
   clearTimeout(scrollTimer);
   scrollTimer = setTimeout(() => {
     const idx = sections.findIndex(sec => {
       const rect = sec.getBoundingClientRect();
       const sectionCenter = rect.top + rect.height / 2;
       return Math.abs(sectionCenter - window.innerHeight / 2) < rect.height / 2;
     });
     if (idx >= 0) currentSectionIndex = idx;
   }, 120);
 }, { passive: true });
})();


// --- Ocultar botón circular al llegar al footer ---
const scrollBtn = document.querySelector(".scroll-next-btn");
const footer = document.querySelector(".final-text");


function checkScroll() {
   const footerTop = footer.getBoundingClientRect().top;
   const windowHeight = window.innerHeight;


   // Si el footer aparece en pantalla, oculta el botón
   if (footerTop < windowHeight - 50) {
       scrollBtn.style.opacity = "0";
       scrollBtn.style.pointerEvents = "none";
   } else {
       scrollBtn.style.opacity = "1";
       scrollBtn.style.pointerEvents = "auto";
   }
}


window.addEventListener("scroll", checkScroll);
checkScroll(); // ejecuta una vez al cargar