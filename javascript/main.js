let titulo = document.getElementById("titulo");
console.log(titulo);

// Array de Productos
const tiendaProductos = [
    { id: 1, nombre: "Chocolate Amargo", imagen: "./assets/amargo1.jpg", precio: 4250},
    { id: 2, nombre: "Chocolate Mixto", imagen: "./assets/mixto.jpg", precio: 6450},
    { id: 3, nombre: "Chocolate Dulce", imagen: "./assets/dulce.jpeg", precio: 5650 },
    { id: 4, nombre: "Chocolate Blanco", imagen: "./assets/leche.jpg", precio: 2500 },
    { id: 5, nombre: "Chocolate en Polvo", imagen: "./assets/polvo.jpg", precio: 3700 },
    { id: 6, nombre: "Chocolate Liquido", imagen: "./assets/liquido.jpeg", precio: 2250 },
    { id: 7, nombre: "Chocolate de Arequipe", imagen: "./assets/arequipe.jpg", precio: 2850 },
    { id: 8, nombre: "Chocolate de Clavos y Canela", imagen: "./assets/clavos-canela.jpg", precio: 1400 },
    { id: 9, nombre: "Chocolate de Vainilla", imagen: "./assets/vainilla.jpeg", precio: 3500 },
    { id: 10, nombre: "Chocolate de Avellanas", imagen: "./assets/avellanas.jpeg", precio: 7500 }
];
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

// Almacenar en Local Storage
function añadirCarro(id) {
    const producto = tiendaProductos.find(prod => prod.id === id);
    if (!producto) return;

    const productoEnCarrito = carrito.find(prod => prod.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(); // Mostrar carrito después de añadir
    Swal.fire("¡Agregaste un Producto!"); // Mostrar alerta
}

function mostrarCarrito() {
    const carritoList = document.getElementById("carrito");
    carritoList.innerHTML = ``;
    let subtotal = 0; 
    let totalItems = 0; // Contador para los artículos totales

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        carritoList.innerHTML = `<li>El carrito está vacío.</li>`;
        document.getElementById("total").textContent = ""; // Limpiar total
        return;
    }

    carrito.forEach((producto, index) => {
        let li = document.createElement("li");
        li.textContent = `"${producto.nombre}" Llevas ${producto.cantidad} unidad por: $${(producto.precio * producto.cantidad).toFixed(2)}`;
        li.innerHTML += `<button onclick="eliminarProducto(${index})" class="boton1">❌</button>`;
        carritoList.appendChild(li);
        subtotal += producto.precio * producto.cantidad;
        totalItems += producto.cantidad; // Sumar cantidad de artículos
    });

    // Calcular total y aplicar descuento
    let total = subtotal;
    if (totalItems > 5) { // Aplicar descuento si hay más de 5 artículos
        const descuento = subtotal * 0.05; // 5% de descuento
        total = subtotal - descuento;
        carritoList.innerHTML += `<li>Descuento (5%): -$${descuento.toFixed(2)}</li>`;
    }
    document.getElementById("total").textContent = `Subtotal: $${subtotal.toFixed(2)} - Total: $${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    localStorage.removeItem("carrito");
    mostrarProductos();
    mostrarCarrito();
});

let productoJson = JSON.stringify(tiendaProductos);
localStorage.setItem("tiendaProductos", productoJson);

function eliminarProducto(index) {
    carrito.splice(index, 1); // Elimina el producto del carrito
    localStorage.setItem("carrito", JSON.stringify(carrito));  
    mostrarCarrito();  
}

// Manejar el envío del formulario
const userForm = document.getElementById("user-form");
userForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar el envío por defecto
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    // Verificar que se ingresó el nombre y el email
    if (nombre && email) {
        Toastify({
            text: `¡Bienvenid@ ${nombre} a nuestra tienda!`,
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "left", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to right,#e8d90b, #00b09b, #ba170f)",
                color: "#fff", 
                fontSize: "20px", 
                padding: "15px", 
                borderRadius: "8px", 
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            },
            onClick: function(){} 
        }).showToast();

        localStorage.setItem("usuario", JSON.stringify({ nombre, email }));
        userForm.reset();
        mostrarProductos(); // Muestra los productos después de ingresar el usuario
        mostrarCarrito(); // Muestra el carrito
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

// Mensaje de bienvenida inicial
Toastify({
    text: "Bienvenidos a Arpedag Store",
    duration: 3000,
    close: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, 
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        borderRadius: "8px"
    },
    onClick: function(){} 
}).showToast();


