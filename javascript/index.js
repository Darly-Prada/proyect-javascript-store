
let contenido = document.getElementById(contenido);

async function tiendaJson(){

// const tiendaJson = "../datos.json"
try{
    const responseJson = await fetch("../datos.json"); //tiendaJson
    const dataJson = await response.json();

    const nombreProducto = dataJson.nombre
    const lista = document.createElement("ul")
    nombreProducto.forEach(producto=> {
        const li = document.createElement("li");
        li.textContent = producto.nombre;
        lista.appendChild("li");
                
    });

   contenido.appendChild(lista) 
}catch(error){
    console.log("error y llevar a toastyfy");
} 

}
tiendaJson()
