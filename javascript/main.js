
// Array de Productos
 const tiendaProductos = [
    { id: 1, nombre: "Chocolate Amargo", imagen: "./assets/amargo1.jpg", precio: 4250 },
    { id: 2, nombre: "Chocolate Mixto", imagen: "./assets/mixto.jpg", precio: 6450 },
    { id: 3, nombre: "Chocolate Dulce", imagen: "./assets/dulce.jpeg", precio: 5650 },
    { id: 4, nombre: "Chocolate Blanco", imagen: "./assets/leche.jpg", precio: 2500 },
    { id: 5, nombre: "Chocolate en Polvo", imagen: "./assets/polvo.jpg", precio: 3700 },
    { id: 6, nombre: "Chocolate Liquido", imagen: "./assets/liquido.jpeg", precio: 2250 },
    { id: 7, nombre: "Chocolate de Arequipe", imagen: "./assets/arequipe.jpg", precio: 2850 },
    { id: 8, nombre: "Chocolate de Clavos y Canela", imagen: "./assets/clavos-canela.jpg", precio: 1400 },
    { id: 9, nombre: "Chocolate de Vainilla", imagen: "./assets/vainilla.jpeg", precio: 3500 },
    { id: 10, nombre: "Chocolate de Avellanas", imagen: "./assets/avellanas.jpeg", precio: 7500 }
];

// funcion de Toastify 

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

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// Función para mostrar los Productos
function mostrarProductos() {
    const productoSection = document.getElementById("producto");
    productoSection.innerHTML = "";

    tiendaProductos.forEach(producto => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "cardContainer";
        cardDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img">
            <p>$${producto.precio.toFixed(2)}</p>
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
        mostrarToast("¡Añadiste un producto nuevo al Carrito!.", 3000, "top", "center", "linear-gradient(to right, #ba170f,#00b09b, #96c93d)");
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(); // Mostrar carrito después de añadir
    actualizarContadorCarrito(); // Actualizar el contador de artículos
  
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const carritoList = document.getElementById("carrito");
    carritoList.innerHTML = ``;
    let subtotal = 0; 
    let totalItems = 0; // Contador para los artículos totales

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        
        carritoList.innerHTML = `
        <h2>Carrito de Compra! 🛒</h2>
        <li class="p">Tu carrito está vacío. ¡Ve a la tienda y agrega tus productos!</li>`;
        document.getElementById("total").textContent = ""; // Limpiar total
        return;
    }

    carrito.forEach((producto, index) => {
        let li = document.createElement("li");
        li.textContent = `${producto.nombre}; Llevas ${producto.cantidad} unidad por: $${(producto.precio * producto.cantidad).toFixed(2)}`;

        // Botón de eliminar un producto del carrito
        li.innerHTML += `<button aria-label="eliminar" onclick="eliminarProducto(${index})" class="boton1">❌<span class="visually-hidden">Eliminar producto</span></button>`;
        
        carritoList.appendChild(li);
        subtotal += producto.precio * producto.cantidad;
        totalItems += producto.cantidad; // Sumar cantidad de artículos
    });

    // Calcular total y aplicar descuento
    let total = subtotal;
    if (totalItems > 5 || subtotal > 20000) { // Aplicar descuento si hay más de 5 artículos o la sumatoria es mayor de 20000
        const descuento = subtotal * 0.05; // 5% de descuento
        total = subtotal - descuento;
        carritoList.innerHTML += `<li>Descuento (5%): -$${descuento.toFixed(2)}</li>`;
    }

    // Mostrar subtotal y total con descuento si aplica
    document.getElementById("total").textContent = `Subtotal: $${subtotal.toFixed(2)} - Total: $${total.toFixed(2)}`;

    // Botón de pagar 

    const totalCompra = document.getElementById("total-compra");

    // Verificar si el botón ya existe
    if (!totalCompra.querySelector("button")) {
        totalCompra.innerHTML += `
            <button onclick="procesarCompra()" class="boton">Pagar</button>
        `;
    }
}
// Función para procesar la compra
function procesarCompra() {
    // Aquí puedes agregar la lógica para procesar el pago, redirigir a una página de pago, o lo que desees
    if (carrito.length === 0) {
        mostrarToast("¡El carrito está vacío! Elige el producto!", 2000, "top", "right", "linear-gradient(to right,#e8d90b, #00b09b, #ba170f)");
    } else {
        // Simulación de compra exitosa
        mostrarToast("¡Compra realizada!. Gracias por tu compra.", 3000, "top", "center", "linear-gradient(to right, #ba170f,#00b09b, #96c93d)");
        }
        // Limpiar el carrito después de realizar la compra
        vaciarCarrito();
        
    }
// Función para eliminar productos del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1); // Elimina el producto del carrito
    localStorage.setItem("carrito", JSON.stringify(carrito));  
    mostrarCarrito();  
    actualizarContadorCarrito(); // Actualizar el contador del carrito
}
// Función para actualizar el contador de artículos en el carrito
function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    document.getElementById("contador-carrito").textContent = totalItems;
}

// Función para vaciar el carrito
function vaciarCarrito() {
   localStorage.removeItem("carrito");
    carrito.length = 0;
    mostrarCarrito();
    actualizarContadorCarrito(); // Actualizar contador
}

// Manejar el envío del formulario
const userForm = document.getElementById("user-form");
userForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar el envío por defecto del formulario

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    // Validación del email utilizando una expresión regular
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return; 
    }

    // Verificar que se ingresó el nombre y el email
    if (nombre && email) {
        // Si ambos campos están llenos, mostrar el toast de bienvenida
        mostrarToast(`¡Bienvenid@ ${nombre} a nuestra tienda!`, 3000, "top", "left", "linear-gradient(to right,#e8d90b, #00b09b, #ba170f)");

        // Guardar el usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify({ nombre, email }));
        userForm.reset(); // Limpiar el formulario

        // Mostrar la tienda y el carrito después de enviar el formulario
        const storeSection = document.getElementById("store");
        storeSection.style.display = "block";  // Mostrar la tienda

        mostrarCarrito(); // Muestra el carrito con productos si es que hay
        mostrarProductos(); // Muestra los productos en la tienda
    } else {
        // Si falta alguno de los campos, mostrar el toast de error
        mostrarToast("Por favor, completa todos los campos.", 3000, "top", "center", "linear-gradient(to right, #ba170f,#00b09b, #96c93d)");
    }
});

// Mensaje de bienvenida inicial
mostrarToast("¡Registra sus datos para ingresar a la tienda!", 5000, "top", "center", "linear-gradient(to right,#ba170f, #00b09b, #96c93d)");

mostrarToast("Bienvenidos a Arpedag Store", 3000, "top", "letf", "linear-gradient(to right, #00b09b, #96c93d)");

// Cargar



