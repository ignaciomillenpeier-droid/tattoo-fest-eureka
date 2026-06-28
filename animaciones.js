// =========================================
// ANIMACIONES DE ENTRADA — EUREKA STUDIO
// Detecta cuando cada elemento entra en pantalla
// y le agrega la clase 'visible' para activar la animación CSS
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------
    // 1. Asignar clases de animación a los elementos
    //    de cada página automáticamente
    // -----------------------------------------

    // Títulos e subtítulos de sección
    document.querySelectorAll('.section-title, .italic-subtitle, .section-desc, .agenda-title, .timeline-title, .galeria-header h2, .galeria-header p').forEach(el => {
        el.classList.add('animar');
    });

    // Sección galería de arte — cards
    document.querySelectorAll('.obra-card').forEach((el, i) => {
        el.classList.add('animar', `animar-delay-${(i % 3) + 1}`);
    });

    // Sección artistas — usar fade porque ya tienen transform en hover
    document.querySelectorAll('.artist-card').forEach((el, i) => {
        el.classList.add('animar-fade', `animar-delay-${(i % 3) + 1}`);
    });

    // Timeline items — entran uno por uno
    document.querySelectorAll('.timeline-item').forEach((el, i) => {
        el.classList.add('animar', `animar-delay-${i + 1}`);
    });

    // Calendario
    const calendarBlock = document.querySelector('.calendar-block');
    if (calendarBlock) calendarBlock.classList.add('animar');

    // Sección ubicación
    document.querySelectorAll('.info-block').forEach((el, i) => {
        el.classList.add('animar', `animar-delay-${i + 1}`);
    });

    const mapWrapper = document.querySelector('.map-wrapper');
    if (mapWrapper) mapWrapper.classList.add('animar');

    // FAQ items
    document.querySelectorAll('.faq-item').forEach((el, i) => {
        el.classList.add('animar', `animar-delay-${(i % 4) + 1}`);
    });

    // Formulario de contacto
    const proForm = document.querySelector('.pro-form');
    if (proForm) proForm.classList.add('animar', 'animar-delay-2');

    // Sección oferta (cards de productos/servicios)
    document.querySelectorAll('.oferta-card').forEach((el, i) => {
        el.classList.add('animar', `animar-delay-${i + 1}`);
    });

    // Cards del catálogo (productos.html)
    document.querySelectorAll('.catalogo-card').forEach((el, i) => {
        el.classList.add('animar', `animar-delay-${(i % 3) + 1}`);
    });

    // Cards de entradas (tienda.html)
    document.querySelectorAll('.producto-card').forEach((el, i) => {
        el.classList.add('animar', `animar-delay-${i + 1}`);
    });

    // Paso a paso del checkout
    document.querySelectorAll('.step').forEach((el, i) => {
        el.classList.add('animar', `animar-delay-${i + 1}`);
    });

    // Historial de órdenes
    const historialTabla = document.querySelector('.historial-tabla');
    if (historialTabla) historialTabla.classList.add('animar');

    // Contacto — datos y formulario
    document.querySelectorAll('.dato-bloque').forEach((el, i) => {
        el.classList.add('animar', `animar-delay-${i + 1}`);
    });

    const contactoForm = document.querySelector('.contacto-form-wrapper');
    if (contactoForm) contactoForm.classList.add('animar', 'animar-delay-2');

    // Bloque de resumen (tienda paso 1)
    const resumenWrapper = document.querySelector('.resumen-paso1-wrapper');
    if (resumenWrapper) resumenWrapper.classList.add('animar');

    // Banner hacia entradas (productos.html)
    const bannerEntradas = document.querySelector('.banner-entradas');
    if (bannerEntradas) bannerEntradas.classList.add('animar');

    // -----------------------------------------
    // 2. IntersectionObserver: activa 'visible'
    //    cuando el elemento entra en pantalla
    // -----------------------------------------
    const observerOpciones = {
        root: null,           // viewport
        rootMargin: '0px',
        threshold: 0.12       // se activa cuando el 12% del elemento es visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Una vez animado, dejar de observar (no se repite)
                observer.unobserve(entry.target);
            }
        });
    }, observerOpciones);

    // Observar todos los elementos con clase 'animar' o 'animar-fade'
    document.querySelectorAll('.animar, .animar-fade').forEach(el => {
        observer.observe(el);
    });

});