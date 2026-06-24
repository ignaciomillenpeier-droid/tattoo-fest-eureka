// =========================================
// MENÚ HAMBURGUESA
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
// AGREGAR ENTRADAS AL CARRITO (cards del paso 1)
// =========================================
document.querySelectorAll('.btn-comprar').forEach(btn => {
    btn.addEventListener('click', () => {
        const nombre = btn.dataset.nombre;
        const precio = btn.dataset.precio;

        agregarAlCarrito(nombre, precio);

        const textoOriginal = btn.textContent;
        btn.textContent = '✓ AGREGADO';
        setTimeout(() => { btn.textContent = textoOriginal; }, 1200);
    });
});

// =========================================
// NAVEGACIÓN ENTRE PANTALLAS DEL CHECKOUT
// =========================================
function irAPantalla(numero) {
    document.querySelectorAll('.checkout-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${numero}`).classList.add('active');

    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('active', 'completed');
        if (stepNum < numero) step.classList.add('completed');
        if (stepNum === numero) step.classList.add('active');
    });

    document.getElementById('checkoutSteps').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =========================================
// BOTÓN "CONTINUAR CON MI PEDIDO" (paso 1 → 2)
// Valida que el carrito no esté vacío
// =========================================
const btnContinuar = document.getElementById('btnContinuarDesdeCarrito');

if (btnContinuar) {
    btnContinuar.addEventListener('click', () => {
        const carrito = obtenerCarrito();

        if (carrito.length === 0) {
            abrirCarrito();
            return;
        }

        pintarResumenPedido();
        irAPantalla(2);
    });
}

// Si llegamos con ?desde=carrito (click en "Finalizar compra" del drawer)
function revisarLlegadaDesdeDrawer() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('desde') === 'carrito') {
        const carrito = obtenerCarrito();
        if (carrito.length > 0) {
            pintarResumenPedido();
            irAPantalla(2);
        }
    }
}

// =========================================
// PINTA EL RESUMEN DEL PEDIDO (pasos 2 y 3)
// =========================================
function pintarResumenPedido() {
    const carrito = obtenerCarrito();
    const total = totalPrecioCarrito();
    const totalFormateado = `$${total.toLocaleString('es-AR')}`;

    const html = carrito.map(item => `
        <div class="resumen-item-fila">
            <span>${item.cantidad} × ${item.nombre}</span>
            <span>$${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
        </div>
    `).join('');

    document.getElementById('resumenItems').innerHTML = html;
    document.getElementById('resumenPrecio').textContent = totalFormateado;

    document.getElementById('resumenItems2').innerHTML = html;
    document.getElementById('resumenPrecio2').textContent = totalFormateado;
}

// =========================================
// BOTONES "VOLVER"
// =========================================
document.querySelectorAll('.btn-volver').forEach(btn => {
    btn.addEventListener('click', () => {
        irAPantalla(parseInt(btn.dataset.volver));
    });
});

// =========================================
// PASO 2 → 3: Datos personales
// =========================================
const formDatos = document.getElementById('formDatos');
if (formDatos) {
    formDatos.addEventListener('submit', (e) => {
        e.preventDefault();
        irAPantalla(3);
    });
}

// =========================================
// MOSTRAR/OCULTAR CAMPOS DE TARJETA según método elegido
// =========================================
const radiosPago = document.querySelectorAll('input[name="metodoPago"]');
const camposTarjeta = document.getElementById('camposTarjeta');

radiosPago.forEach(radio => {
    radio.addEventListener('change', () => {
        camposTarjeta.style.display = radio.value === 'tarjeta' && radio.checked ? 'block' : 'none';
    });
});

// =========================================
// PASO 3 → 4: Confirmar pedido
// =========================================
const formPago = document.getElementById('formPago');
if (formPago) {
    formPago.addEventListener('submit', (e) => {
        e.preventDefault();

        const carrito = obtenerCarrito();
        const total = totalPrecioCarrito();
        const numeroOrden = `#EUR-${Math.floor(1000 + Math.random() * 9000)}`;
        const fechaHoy = new Date().toLocaleDateString('es-AR');

        const htmlConfirm = carrito.map(item => `
            <div class="detalle-row">
                <span>${item.cantidad} × ${item.nombre}</span>
                <span>$${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
            </div>
        `).join('');

        document.getElementById('ordenNumero').textContent = numeroOrden;
        document.getElementById('confirmItems').innerHTML = htmlConfirm;
        document.getElementById('confirmPrecio').textContent = `$${total.toLocaleString('es-AR')}`;
        document.getElementById('confirmFecha').textContent = fechaHoy;

        irAPantalla(4);

        // Vaciamos el carrito: la compra ya fue "confirmada"
        vaciarCarrito();
    });
}

// =========================================
// INIT
// =========================================
revisarLlegadaDesdeDrawer();