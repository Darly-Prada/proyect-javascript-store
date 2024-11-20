// Arpedag Store 

let tiendaProductos = []; // variable Global 
// Cargamos el carrito desde localStorage
const carrito = JSON.parse(localStorage.getItem("carrito")) || []; 

// Función para mostrar los mensajes toastify
function mostrarToast(texto, duracion = 3000, gravedad = "top", posicion = "center", colorFondo = "linear-gradient(to right, #ba170f, #00b09b, #96c93d)") {
    Toastify({
        text: texto,
        duration: duracion,
        close: true,
        gravity: gravedad,  // Puede ser "top" o "bottom"
        position: posicion,  // Puede ser "left", "center", "right"
        stopOnFocus: true, 
        style: {
            background: colorFondo,
            color: "#fff", 
            fontSize: "18px", 
            padding: "10px", 
            borderRadius: "8px", 
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        },
        onClick: function() {} 
    }).showToast();
}

// Función asincrónica para obtener los datos de la tienda desde archivo Json. 
async function cargarProductos() {
    try {
        const responseJson = await fetch("./javascript/datos.json");
        if (!responseJson.ok) {
            throw new Error(`Error al cargar el archivo JSON: ${responseJson.statusText}`);
        }
        const dataJson = await responseJson.json();
        tiendaProductos = dataJson;
        mostrarProductos(tiendaProductos);  // Mostrar productos cargados
    } catch (error) {
        mostrarToast("Error al cargar los productos.", 3000, "top", "center", "linear-gradient(to right, #ba170f, #00b09b, #96c93d)");
    }
}

// Función para mostrar los productos en la tienda
function mostrarProductos(tiendaProductos) {
    const productoSection = document.getElementById("producto");
    productoSection.innerHTML = "";

    tiendaProductos.forEach(producto => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "cardContainer";

        // Asegúrate de que el precio sea un número
        const precio = parseFloat(producto.precio);
        if (isNaN(precio)) {
            mostrarToast("El precio no es válido:", 2000, "top", "center", "linear-gradient(to right, #ba170f, #00b09b, #96c93d)");
            return;
        }

        cardDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img">
            <p>$${precio.toFixed(2)}</p>
            <button onclick="añadirCarro(${producto.id})" class="boton">Comprar</button>
        `;
        productoSection.appendChild(cardDiv);
    });
}

// Función para añadir productos al carrito
function añadirCarro(id) {
    const producto = tiendaProductos.find(prod => prod.id === id);
    if (!producto) return;

    const productoEnCarrito = carrito.find(prod => prod.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
        mostrarToast("¡Añadiste un producto nuevo al Carrito!", 2000, "top", "center", "linear-gradient(to right, #ba170f, #00b09b, #96c93d)");
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();  // Actualizar el carrito mostrado
    actualizarContadorCarrito();  // Actualizar contador del carrito
}

function mostrarCarrito() {
    const carritoList = document.getElementById("carrito");
    carritoList.innerHTML = "";  // Limpiar el contenido previo
    let subtotal = 0;
    let totalItems = 0;

    // Verifica si el carrito está vacío
    if (carrito.length === 0) {
        carritoList.innerHTML = `
            <h2>Carrito de Compra 🛒</h2>
            <li class="p">Tu carrito está vacío. ¡Ve a la tienda y agrega tus productos!</li>`;
        document.getElementById("total").textContent = "";
        return;
    }

    carrito.forEach((producto, index) => {
        let li = document.createElement("li");
        li.textContent = `${producto.nombre}; Llevas ${producto.cantidad} unidad por: $${(producto.precio * producto.cantidad).toFixed(2)}`;

        // Botón de eliminar un producto del carrito
        li.innerHTML += `<button aria-label="eliminar" onclick="eliminarProducto(${index})" class="boton1"><span class="visually-hidden">Eliminar producto</span>❌</button>`;
        carritoList.appendChild(li);
        subtotal += producto.precio * producto.cantidad;
        totalItems += producto.cantidad;
    });

    let total = subtotal;
    if (totalItems >= 5 || subtotal >= 20000) {
        const descuento = subtotal * 0.05;
        total = subtotal - descuento;
        carritoList.innerHTML += `<li>Descuento (5%): -$${descuento.toFixed(2)}</li>`;
    }

    document.getElementById("total").textContent = `Subtotal: $${subtotal.toFixed(2)} - Total: $${total.toFixed(2)}`;

    const totalCompra = document.getElementById("total-compra");
    if (!totalCompra.querySelector("button")) {
        totalCompra.innerHTML += `<button onclick="procesarCompra()" class="boton">Pagar</button>`;
    }
}

// Función para procesar la compra
function procesarCompra() {
    if (carrito.length === 0) {
        mostrarToast("¡El carrito está vacío! Elige un producto", 2000, "top", "right", "linear-gradient(to right, #e8d90b, #00b09b, #ba170f)");
    } else {
        mostrarToast("¡Compra realizada! Gracias por tu compra.", 3000, "top", "center", "linear-gradient(to right, #ba170f, #00b09b, #96c93d)");
        vaciarCarrito();
        mostrarCarrito();  
        actualizarContadorCarrito();
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    carrito.length = 0;
    mostrarCarrito();
    actualizarContadorCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1); // Elimina el producto del carrito usando el índice
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el carrito en el localStorage
    mostrarCarrito(); // Vuelve a mostrar el carrito actualizado
    actualizarContadorCarrito(); // Actualiza el contador del carrito
}

// Event listener para el formulario de usuario
const userForm = document.getElementById("user-form");
userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        mostrarToast("Por favor, introduce un correo electrónico válido.", 3000, "top", "center", "linear-gradient(to right, #ba170f, #00b09b, #96c93d)");
        return;
    }

    if (nombre && email) {
        mostrarToast(`¡Bienvenid@ ${nombre} a nuestra tienda!`, 3000, "top", "left", "linear-gradient(to right,#e8d90b, #00b09b, #ba170f)");
        localStorage.setItem("usuario", JSON.stringify({ nombre, email }));
        userForm.reset();
        document.getElementById("store").style.display = "block";
        mostrarCarrito();
        cargarProductos();  // Cargar los productos de la tienda
    } else {
        mostrarToast("Por favor, completa todos los campos.", 3000, "top", "center", "linear-gradient(to right, #ba170f, #00b09b, #96c93d)");
    }
});

// Mensajes de bienvenida
mostrarToast("¡Registra tus datos para ingresar a la tienda!", 5000, "top", "center", "linear-gradient(to right,#ba170f, #00b09b, #96c93d)");
mostrarToast("Bienvenidos a Arpedag Store", 3000, "top", "left", "linear-gradient(to right, #00b09b, #96c93d)");



