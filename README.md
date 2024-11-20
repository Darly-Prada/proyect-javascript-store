# Arpedag Store 
El proyecto de trata de una tienda de Chocolates Semi-orgánico Natural en varias presentaciones 

## CONTENIDO 

### Primer Item  
1. La página Home contiene información sobre la empresa, sus objetivos, locación y datos de contacto.
- los botones dirigen al usuario a la tienda 

### Segundo Item 
2. La pagina Store Contiene la interactividad y funcionalidad empleando JAVASCRIPT donde se emplea variables, funciones, librerías 

### Descripción y funcionalidad 
- Se crea una función de "Toastify"  para mostrar mensajes en diferentes modulos al usuario.

#### Ingreso Usuario  
- se carga la navegación 
- aparece un formulario para registro de ingreso a la tienda, solictando nombre y correo. 
- Estos son validados y cargan la información de los productos y el carrito de compras 

#### Ingreso al módulo Store 
3. El usuario vera un mensaje en el carrito vacio,  y la lista de los productos de la tienda. 


### Se almacenan los datos de los productos en archivo JSON.
- Función asincroníca con uso de fetch obtiene la url de los productos 
- Función para procesar la compra

### En el simulador de compra el usuario puede: 
3. Se crea un simulador de compra 

  * Cada que selecciona un producto este se suma al carrito. 
   muestra el nombre, unidades agregadas y precio 

  *  si el usuario selecciona 5 productos o el valor supera los $ 20000 obtendra un descuento del 5%
  y vera la operación, subtotal descuento apliado al total final 

 

* el usuario puede agregar productos o desde el carrito eliminarlos si asi desea. 
### Función para procesar la compra

 * Al ejecutar el Boton de pagar este vacia el carrito y puede ejecutar la compra de nuevo. 

* si el usuario ejecuta nuevamente sin añadir productos le saldra un mensaje indicandole que hacer 

### Función Local Storage 
* los productos seleccionados por el usuario son almacenados en local starage.


#### Darleida Prada 



