document.addEventListener('DOMContentLoaded', () => {

    // --- 2. FUNCIONALIDAD DEL MAPA DESPLEGABLE (Sin cambios) ---

    const mapToggle = document.querySelector(".map-toggle");
    const mapContent = document.querySelector(".map-content");
    const arrow = document.querySelector(".arrow");

    mapToggle.addEventListener("click", () => {
        mapContent.classList.toggle("map-open");
        if (mapContent.classList.contains("map-open")) {
            arrow.textContent = "keyboard_arrow_up";
            mapToggle.setAttribute("aria-expanded", "true");
        } else {
            arrow.textContent = "keyboard_arrow_down";
            mapToggle.setAttribute("aria-expanded", "false");
        }
    });

    // --- 3. FUNCIONALIDAD DEL CARRUSEL (CORREGIDO PARA 1 ÍTEM A LA VEZ) ---
    
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const dots = document.querySelectorAll('.dot');
    
    if (items.length <= 1) {
        if (dots[0]) dots[0].classList.add('active'); 
        return; 
    } 

    let currentIndex = 0; // Contará cada uno de los 3 ítems: 0, 1, 2
    let startX = 0;
    let isDragging = false;
    let currentTranslate = 0; 

    // El ancho de un solo ítem (que es igual al ancho del carrusel visible)
    const itemWidth = items[0].offsetWidth; 

    function setSlide(index) {
        
        // El carrusel debe ser circular: si vas al final, vuelve al inicio (y viceversa)
        if (index < 0) index = items.length - 1; 
        if (index >= items.length) index = 0; 

        currentIndex = index;

        // Calcula la posición en PIXELES (índice * ancho de 1 ítem)
        currentTranslate = -currentIndex * itemWidth;

        // Aplica la transformación
        track.style.transform = `translateX(${currentTranslate}px)`;

        // Actualiza los puntos (un dot por ítem)
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    // --- Eventos Táctiles (Touch Events) ---

    track.addEventListener('touchstart', e => {
        e.preventDefault(); 
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = 'none'; 
    });

    track.addEventListener('touchmove', e => {
        if (!isDragging) return;
        e.preventDefault(); 
        const deltaX = e.touches[0].clientX - startX;
        track.style.transform = `translateX(${currentTranslate + deltaX}px)`;
    });

    track.addEventListener('touchend', e => {
        isDragging = false;
        track.style.transition = 'transform 0.5s ease-in-out'; 
        
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;

        // Si te mueves más de 50px, cambia de diapositiva
        if (deltaX < -50) setSlide(currentIndex + 1); // Swipe Izquierda (Avanza)
        else if (deltaX > 50) setSlide(currentIndex - 1); // Swipe Derecha (Retrocede)
        else setSlide(currentIndex); // Se queda en la misma
    });

    // Control por puntos
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => setSlide(i));
    });

    // Inicializa el carrusel
    setSlide(0); 
});