// =========================================
// CARRITO EUREKA — motor compartido
// Se incluye en index.html, productos.html y tienda.html
// Usa localStorage para persistir entre páginas
// =========================================

const CARRITO_KEY = 'eureka_carrito';

// -----------------------------------------
// Helpers de lectura / escritura
// -----------------------------------------
function obtenerCarrito() {
    const data = localStorage.getItem(CARRITO_KEY);
    return data ? JSON.parse(data) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// -----------------------------------------
// Agregar un ítem (si ya existe, suma cantidad)
// -----------------------------------------
function agregarAlCarrito(nombre, precio) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(item => item.nombre === nombre);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio: parseInt(precio), cantidad: 1 });
    }

    guardarCarrito(carrito);
    renderizarCarrito();
    abrirCarrito();
}

// -----------------------------------------
// Cambiar cantidad de un ítem
// -----------------------------------------
function cambiarCantidad(nombre, delta) {
    let carrito = obtenerCarrito();
    const item = carrito.find(i => i.nombre === nombre);
    if (!item) return;

    item.cantidad += delta;

    if (item.cantidad <= 0) {
        carrito = carrito.filter(i => i.nombre !== nombre);
    }

    guardarCarrito(carrito);
    renderizarCarrito();
}

// -----------------------------------------
// Eliminar un ítem por completo
// -----------------------------------------
function eliminarDelCarrito(nombre) {
    const carrito = obtenerCarrito().filter(i => i.nombre !== nombre);
    guardarCarrito(carrito);
    renderizarCarrito();
}

// -----------------------------------------
// Vaciar carrito (se usa tras confirmar compra)
// -----------------------------------------
function vaciarCarrito() {
    localStorage.removeItem(CARRITO_KEY);
    actualizarContadorCarrito();
    renderizarCarrito();
}

// -----------------------------------------
// Total de ítems (para el contador del header)
// -----------------------------------------
function totalItemsCarrito() {
    return obtenerCarrito().reduce((acc, item) => acc + item.cantidad, 0);
}

// -----------------------------------------
// Total en dinero
// -----------------------------------------
function totalPrecioCarrito() {
    return obtenerCarrito().reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

// -----------------------------------------
// Actualiza el numerito sobre el ícono del carrito
// -----------------------------------------
function actualizarContadorCarrito() {
    const contador = document.getElementById('carritoContador');
    if (!contador) return;

    const total = totalItemsCarrito();
    contador.textContent = total;
    contador.style.display = total > 0 ? 'flex' : 'none';
}

// -----------------------------------------
// Abrir / cerrar el drawer
// -----------------------------------------
function abrirCarrito() {
    const drawer = document.getElementById('carritoDrawer');
    const overlay = document.getElementById('carritoOverlay');
    if (!drawer || !overlay) return;

    drawer.classList.add('activo');
    overlay.classList.add('activo');
    document.body.style.overflow = 'hidden';
}

function cerrarCarrito() {
    const drawer = document.getElementById('carritoDrawer');
    const overlay = document.getElementById('carritoOverlay');
    if (!drawer || !overlay) return;

    drawer.classList.remove('activo');
    overlay.classList.remove('activo');
    document.body.style.overflow = '';
}

// -----------------------------------------
// Renderiza el contenido del drawer
// -----------------------------------------
function renderizarCarrito() {
    const lista = document.getElementById('carritoLista');
    const vacio = document.getElementById('carritoVacio');
    const footer = document.getElementById('carritoFooter');
    const totalSpan = document.getElementById('carritoTotal');

    if (!lista) return; // esta página no tiene drawer

    const carrito = obtenerCarrito();
    lista.innerHTML = '';

    if (carrito.length === 0) {
        vacio.style.display = 'flex';
        footer.style.display = 'none';
        return;
    }

    vacio.style.display = 'none';
    footer.style.display = 'block';

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        const fila = document.createElement('div');
        fila.className = 'carrito-item';
        fila.innerHTML = `
            <div class="carrito-item-info">
                <p class="carrito-item-nombre">${item.nombre}</p>
                <p class="carrito-item-precio">$${item.precio.toLocaleString('es-AR')} c/u</p>
            </div>
            <div class="carrito-item-controles">
                <button class="carrito-btn-cantidad" data-accion="restar" data-nombre="${item.nombre}">−</button>
                <span class="carrito-item-cantidad">${item.cantidad}</span>
                <button class="carrito-btn-cantidad" data-accion="sumar" data-nombre="${item.nombre}">+</button>
            </div>
            <div class="carrito-item-subtotal">
                $${subtotal.toLocaleString('es-AR')}
            </div>
            <button class="carrito-btn-eliminar" data-nombre="${item.nombre}" aria-label="Eliminar">✕</button>
        `;
        lista.appendChild(fila);
    });

    totalSpan.textContent = `$${totalPrecioCarrito().toLocaleString('es-AR')}`;

    // Listeners de los botones recién creados
    lista.querySelectorAll('.carrito-btn-cantidad').forEach(btn => {
        btn.addEventListener('click', () => {
            const delta = btn.dataset.accion === 'sumar' ? 1 : -1;
            cambiarCantidad(btn.dataset.nombre, delta);
        });
    });

    lista.querySelectorAll('.carrito-btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => {
            eliminarDelCarrito(btn.dataset.nombre);
        });
    });
}

// -----------------------------------------
// Inicialización: listeners del ícono, overlay y botón cerrar
// -----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    renderizarCarrito();

    const iconoCarrito = document.getElementById('carritoIcono');
    const overlay = document.getElementById('carritoOverlay');
    const btnCerrar = document.getElementById('carritoCerrar');

    if (iconoCarrito) {
        iconoCarrito.addEventListener('click', abrirCarrito);
    }
    if (overlay) {
        overlay.addEventListener('click', cerrarCarrito);
    }
    if (btnCerrar) {
        btnCerrar.addEventListener('click', cerrarCarrito);
    }
});