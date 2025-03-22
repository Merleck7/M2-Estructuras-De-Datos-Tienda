// Usamos un Map para evitar duplicados y asociar el nombre del producto con su precio
const carrito = new Map();
const agregarProducto = document.querySelectorAll(".agregar-btn");
const modal = document.getElementById("carrito-modal");
const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const botonVerCarrito = document.getElementById("ver-carrito");
const cerrarModal = document.querySelector(".cerrar");

// Agregar producto al carrito (sin duplicados)
agregarProducto.forEach(boton => {
    boton.addEventListener("click", () => {
        const producto = boton.parentElement;
        const nombre = producto.dataset.nombre;
        const precio = parseFloat(producto.dataset.precio);

        // Si el producto ya está en el carrito, no lo agregamos nuevamente
        if (carrito.has(nombre)) {
            alert(`${nombre} ya está en el carrito`);
        } else {
            carrito.set(nombre, precio);  // Agregamos el producto al Map
        }
    });
});

// Mostrar el carrito con botones para eliminar productos
botonVerCarrito.addEventListener("click", () => {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((precio, nombre) => {
        const li = document.createElement("li");
        li.className = "item-carrito";

        // Contenido del producto
        const productoTexto = document.createElement("span");
        productoTexto.textContent = `${nombre} - $${precio.toFixed(2)}`;

        // Botón para eliminar
        const eliminarProducto = document.createElement("button");
        eliminarProducto.textContent = "❌";
        eliminarProducto.className = "eliminar-btn";
        eliminarProducto.addEventListener("click", () => {
            carrito.delete(nombre);  // Eliminar del Map usando el nombre del producto
            mostrarCarrito();        // Actualizar la vista del carrito
        });

        li.appendChild(productoTexto);
        li.appendChild(eliminarProducto);
        listaCarrito.appendChild(li);

        total += precio;
    });

    totalElemento.textContent = `Total: $${total.toFixed(2)}`;
    modal.style.display = "block";
});

// Función para actualizar la vista del carrito
function mostrarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((precio, nombre) => {
        const li = document.createElement("li");
        li.className = "item-carrito";

        const productoTexto = document.createElement("span");
        productoTexto.textContent = `${nombre} - $${precio.toFixed(2)}`;

        const eliminarProducto = document.createElement("button");
        eliminarProducto.textContent = "❌";
        eliminarProducto.className = "eliminar-btn";
        eliminarProducto.addEventListener("click", () => {
            carrito.delete(nombre);  // Eliminar producto del carrito
            mostrarCarrito();        // Actualizar la vista del carrito
        });

        li.appendChild(productoTexto);
        li.appendChild(eliminarProducto);
        listaCarrito.appendChild(li);

        total += precio;
    });

    totalElemento.textContent = `Total: $${total.toFixed(2)}`;
}

// Cerrar modal
cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Cerrar modal al hacer clic fuera
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
