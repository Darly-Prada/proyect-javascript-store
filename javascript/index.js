// Saludo de Bienvenida!!!. 

 alert("Bienvenidos a Arpedag Store");

let nombreVisitante =prompt("por favor ingresa su nombre: ");
  alert("Bienvenido/a: " +nombreVisitante+ " a Arpedag Store");
 
// 1. Se crea un programa que permita identificar el ingreso a la tienda, e identificar su ingreso en calidad de: (Administrador, Gerente, Vendedor o Cliente u Otro). 

function accesoPorRol(rol){
switch (rol) {
    case "gerente":
        respuesta = console.log("Dirijase a la Sala de Juntas");
        break;
    case "administrador":
        console.log("Es solicitado en la Gerencia");
        break;
    case "vendedor":
        console.log("Diríjase a la Gerencia Comercial");
        break;
    case "cliente":
        console.log("Bienvenido/a a nuestra tienda Chocolates Arpedag");
        break;
    default: 
       console.log("No estas registrado, vaya a recepción para mas información");
        break;
}
}
const respuesta = accesoPorRol("cliente");  // en el llamado debe indicar el rol si es gerente, asministrador, vendedor o cliente. 
// const respuesta = accesoPorRol();

// 2. el cliente puede conocer la sumaoria de sus productos ingresando el precio 

let total = 0;
let contadorProductos = 0; // Variable para contar los productos

// Solicitar el valor primer producto
let productoUno = parseFloat(prompt("Por favor ingresa el valor del producto uno:"));
if (!isNaN(productoUno) && productoUno >= 0) {
  total += productoUno; // Sumamos el primer producto al total
  contadorProductos++; // Aumenta el contador
} else {
  alert("Por favor ingresa un número válido para el primer producto.");
}
// Bucle para agregar más productos
while (true) {
  let productoDos = prompt("Ingresa el valor del siguiente producto o escribe 'fin' para finalizar operación");
  if (productoDos.toLowerCase() === "fin") {
    break; // Finaliza el bucle si el usuario escribe 'terminar'
  }
  let valorProducto = parseFloat(productoDos);
  if (!isNaN(valorProducto) && valorProducto >= 0) {
    total += valorProducto; // Sumar el producto al total
    contadorProductos++; // Aumenta el contador
  } else {
    alert("Por favor ingresa un número correcto");
  }
  
}
// Mostrar la cantidad de productos que ingreso y el costo total
console.log("La cantidad de productos ingresados es: " + contadorProductos);
console.log("El valor total de los productos es: $ " + total.toFixed(2));



// simulador de productos 
// el usuario ingresa el numero del producto que desea comprar de la lista disponiblecuando finalice la seleccion se le genera el total de los productos. 


class Chocolate {
  constructor(nombre, precio) {
      this.nombre = nombre;
      this.precio = precio;
  }

  toString() {
      return `${this.nombre} - $${this.precio.toFixed(2)}`;
  }
}

class Tienda {
  constructor() {
      this.chocolates = [
          new Chocolate("Chocolate Amargo", 12500),
          new Chocolate("Chocolate con Dulce", 16500),
          new Chocolate("Chocolate Blanco", 14500),
          new Chocolate("Chocolate de Sabores", 22000)
      ];
  }

  mostrarChocolates() {
      console.log("Chocolates disponibles:");
      this.chocolates.forEach((chocolate, index) => {
          console.log(`${index + 1}. ${chocolate}`);
      });
  }

  comprar() {
      let total = 0;

      while (true) {
          this.mostrarChocolates();
          const seleccion = prompt("Selecciona el número del chocolate que deseas comprar (o 'fin' para salir):");

          if (seleccion.toLowerCase() === 'fin') {
              break;
          }

          const indice = parseInt(seleccion) - 1;

          if (!isNaN(indice) && indice >= 0 && indice < this.chocolates.length) {
              total += this.chocolates[indice].precio;
              console.log(`Has agregado ${this.chocolates[indice].nombre} al carrito.`);
          } else {
              console.log("Selección no válida. Intenta de nuevo.");
          }
      }

      console.log(`Total de la compra: $${total.toFixed(2)}`);
  }
}

function simulador() {
  const tienda = new Tienda();
  tienda.comprar();
}

// Ejecutar el simulador
simulador();