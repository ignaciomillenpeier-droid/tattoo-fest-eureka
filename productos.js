// =========================================
// MENÚ HAMBURGUESA (mismo comportamiento que las demás páginas)
// =========================================
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// =========================================
// AGREGAR PRODUCTO AL CARRITO (ver carrito.js)
// =========================================
document.querySelectorAll('.btn-comprar').forEach(btn => {
    btn.addEventListener('click', () => {
        const nombre = btn.dataset.nombre;
        const precio = btn.dataset.precio;

        agregarAlCarrito(nombre, precio);

        // Feedback visual rápido en el botón
        const textoOriginal = btn.textContent;
        btn.textContent = '✓ AGREGADO';
        btn.classList.add('agregado');

        setTimeout(() => {
            btn.textContent = textoOriginal;
            btn.classList.remove('agregado');
        }, 1200);
    });
});