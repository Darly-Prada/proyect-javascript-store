// Saludo de Bienvenida!!!. 

 alert("Bienvenidos a Arpedag Store");

let nombreVisitante =prompt("por favor ingresa su nombre: ");
  console.log("Bienvenido/a: " +nombreVisitante+ " a Arpedag Store");
 
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
const respuesta = accesoPorRol("cliente");  
// const respuesta = accesoPorRol();
 
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
      this.carrito = []; // Arreglo para almacenar los productos comprados
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
          const seleccion = prompt("Selecciona de 1 al 4 el número del chocolate que deseas comprar (o 'fin' para salir):");

          if (seleccion.toLowerCase() === 'fin') {
              break;
          }
          const indice = parseInt(seleccion) - 1;
          if (!isNaN(indice) && indice >= 0 && indice < this.chocolates.length) {
              const chocolateSeleccionado = this.chocolates[indice];
              
              // Preguntar cuántas unidades desea comprar
              const unidades = parseInt(prompt(`¿Cuántas unidades de ${chocolateSeleccionado.nombre} deseas comprar?`));
              if (!isNaN(unidades) && unidades > 0) {
                  total += chocolateSeleccionado.precio * unidades;
                  this.carrito.push({ chocolate: chocolateSeleccionado, unidades }); // Agrega el chocolate y unidades al carrito
                  console.log(`Has agregado ${unidades} de ${chocolateSeleccionado.nombre} al carrito.`);
              } else {
                  console.log("Cantidad no válida. Intenta de nuevo.");
              }
          } else {
              console.log("Selección no válida. Intenta de nuevo.");
          }
      }

      // Mostrar el detalle de la compra
      console.log("Detalle de tu compra:");
      this.carrito.forEach((item) => {
          const subtotal = item.chocolate.precio * item.unidades;
          console.log(`${item.chocolate.toString()} x ${item.unidades} - Subtotal: $${subtotal.toFixed(2)}`);
      });
      console.log(`Total de la compra: $${total.toFixed(2)}`);
  }
}

function simulador() {
  const tienda = new Tienda();
  tienda.comprar();
}

// Ejecutar el simulador
simulador();