window.addEventListener('DOMContentLoaded', function () { //carga del sw
    if (navigator.serviceWorker && navigator.serviceWorker.register){ //chequea si el navegador soporta sw
        navigator.serviceWorker.register('sw.js'); //registra el sw
    }else{
        console.log("no puedo usar service worker");
    }
})



let carritoDeCompra = new Carrito();

let arrayProductos = [
    {
        id: 1,
        nombre: "Remera Nike blanca",
        descripcion: "Remera Blanca Nike, hecha 100% de algodón, fresca para este verano.",
        precio: 2000,
        imagen: "img/remera1.jpg",
        categoria: "remeras",
    },
    {
        id: 2,
        nombre: "Remera",
        descripcion: "Nueva Remera Roja Nike, hecha a base de tela suave, y antitranspirante.",
        precio: 1800,
        imagen: "img/remera2.jpg",
        categoria: "remeras",
    },
    {
        id: 3,
        nombre: "Pantalon Nike Negro",
        descripcion: "Pantalon Nike Negro deportivo, y achupinado en la parte baja de la pierna.",
        precio: 3200,
        imagen: "img/pantalon1.jpg",
        categoria: "pantalones",
    },
    {
        id: 4,
        nombre: "Pantalon Nike Gris",
        descripcion: "Pantalon Nike Gris deportivo de tela muy suave, elástico y flexible.",
        precio: 3000,
        imagen: "img/pantalon2.jpg",
        categoria: "pantalones",
    },
    {
        id: 5,
        nombre: "Zapatillas Blancas",
        descripcion: "Zapatillas Nike Blancas con camara de aire, y plantilla adaptable al pie.",
        precio: 8000,
        imagen: "img/zapatillas1.jpg",
        categoria: "zapatillas",
    },
    {
        id: 6,
        nombre: "Zapatillas Nike Negras",
        descripcion: "Zapatillas Nike Negras deportivas para running, hecho de tela.",
        precio: 11000,
        imagen: "img/zapatillas2.jpg",
        categoria: "zapatillas",
    },
];

let contenedorProducto = document.querySelector("#productos")

arrayProductos.forEach((p)=>{
    contenedorProducto.append(crearTarjetaProducto(p));
});




function crearTarjetaProducto (producto){

     //este es el div contenedor del card
     let divContenedorproducto = document.createElement("div");
     divContenedorproducto.className = "tarjetaContenedor";

      //esta imagen va dentro del div contenedor
      let imgCardProducto = document.createElement("img");
      imgCardProducto.className = "img"
      imgCardProducto.setAttribute("src", `${producto.imagen}`);
      imgCardProducto.setAttribute("alt", `remera`);
      
      //esta es el body del card
      let divCardBody = document.createElement("div");
     divCardBody.className = "bodyCard"

     //titulo del div card-body - nombre
     let tituloCardBody = document.createElement("h3");
     tituloCardBody.className = "tituloCardBody"
     tituloCardBody.innerText = `${producto.nombre}`

     //descripcion del producto
     let descriptCardBody = document.createElement("p");
     descriptCardBody.className = "descripcion";
     descriptCardBody.innerText = `${producto.descripcion}`;

     let precioCardBody = document.createElement("p")
     precioCardBody.className = "precio";
     precioCardBody.innerText = `$ ${producto.precio}`

     //nombre de la categoria
    let nombreProducto = document.createElement("p");
    nombreProducto.className = "nombre";
    nombreProducto.innerText = `${producto.categoria}`

      //boton de comprar producto
      let botonCompraCardBody = document.createElement("button");
      botonCompraCardBody.className = "boton";
      botonCompraCardBody.innerText = "comprar";

      botonCompraCardBody.setAttribute("onclick",`agregarCarrito(${producto.id})`)

      //card body
      
      divCardBody.append(tituloCardBody);
      divCardBody.append(descriptCardBody);
      divCardBody.append(precioCardBody);
      divCardBody.append(nombreProducto);
      divCardBody.append(botonCompraCardBody);

      //card
      divContenedorproducto.append(imgCardProducto);
      divContenedorproducto.append(divCardBody);

      //contenedor
      return divContenedorproducto;

}

function agregarCarrito(idProducto){
    carritoDeCompra.agregarProducto(buscarProducto(idProducto))
    mostrarCantidadDeProductos()
    mostrarCantidadDelPrecio()
}

function buscarProducto(idProducto){
 
    let miProducto;
    for (let i = 0; i < arrayProductos.length; i++) {
        if (arrayProductos[i].id == idProducto){
             miProducto = arrayProductos[i];
        }

    }
    return miProducto
}

function mostrarCantidadDeProductos(){
    document.querySelector("#cantidadProductos").innerText = `${carritoDeCompra.cantidadDeProductos()}`
    document.querySelector("#items").innerText = `${carritoDeCompra.cantidadDeProductos()}`
}

//Crear una funcion, llamar #cantidadTotalPrecio, Ponerle un innerText, Llama a carrito de compra, y carrito de compra mostrarPrecioTotalDeLaCompra.
function mostrarCantidadDelPrecio(){
    document.querySelector("#cantidadTotalPrecio").innerText = `${carritoDeCompra.mostrarPrecioTotalDeLaCompra()}` 
    document.querySelector("#total").innerText = `${carritoDeCompra.mostrarPrecioTotalDeLaCompra()}` 
}





document.querySelector("select").addEventListener("change", (e) => {
    /* Guardo el option elegido */

    let categoria = e.target.value;

    let filtrado = arrayProductos.filter((productos) => productos.categoria.includes(categoria));
    contenedorProducto.replaceChildren();

    if(categoria == "todas"){
        arrayProductos.forEach((p)=>{
            contenedorProducto.append(crearTarjetaProducto(p));
        });
    }

    filtrado.forEach((p)=>{
        contenedorProducto.append(crearTarjetaProducto(p));
    });

    mostrarOferta(categoria)
});


// Cerrar Carrito
function cerrarCarrito(){
    document.querySelector("#modalCarrito").style.display = "none"
}


//TODO:
//Abrir Carrito
function abrirCarrito(){
    let listita = document.querySelector("#listita")
    listita.replaceChildren()
    carritoModal()
    document.querySelector("#modalCarrito").style.display = "block"
}


//Funcion Eliminar Lista Producto
function eliminarProducto(idProducto){
    carritoDeCompra.quitarProductoDelCarrito(idProducto)
    mostrarCantidadDeProductos()
    mostrarCantidadDelPrecio()

let listita = document.querySelector("#listita")
    listita.replaceChildren()
    carritoModal()
}

//Funcion para vaciar el carrito
function vaciar(){
    carritoDeCompra.vaciarCarrito()
    mostrarCantidadDeProductos()
    mostrarCantidadDelPrecio()
    let listita = document.querySelector("#listita")
    listita.replaceChildren();
}

let carrito = [];

let contenedorCarritos = document.querySelector("#listita")

function carritoModal(){
    carritoDeCompra.devolverProductos().forEach((p)=>{
        contenedorCarritos.append(crearDatosCarrito(p));
    });
}

function crearDatosCarrito(producto){

    //esto es lista
    let divContenedorCarrito = document.createElement("li");
    divContenedorCarrito.className = "listaCarrito";

     //este nombre
     let nombreCarrito = document.createElement("span");
     nombreCarrito.className = "name"
     nombreCarrito.innerText = `${producto.nombre}`

     //este precio
     let precioCarrito = document.createElement("span");
     precioCarrito.className = "precioo"
     precioCarrito.innerText = `$${producto.precio}`

    
    //boton eliminar
      let eliminarCarrito = document.createElement("a");
      eliminarCarrito.className = "cantidadd";
      eliminarCarrito.innerText = "Eliminar"
      eliminarCarrito.setAttribute("onclick", `eliminarProducto(${producto.id})`)
      eliminarCarrito.setAttribute("style", `cursor: pointer`)

     //Contenedor Carrito
     divContenedorCarrito.append(nombreCarrito);
     divContenedorCarrito.append(precioCarrito);
     //divContenedorCarrito.append(cantidadCarrito);
     divContenedorCarrito.append(eliminarCarrito);
    //  divContenedorCarrito.append(nombreProducto);


     //contenedor
     return divContenedorCarrito;
}



//Funcion banner
function mostrarOferta(categoria) {

    let banner = document.querySelector("#banner");

    banner.innerText = "";

    let cardOferta = document.createElement("div");
    cardOferta.className = "card";
    cardOferta.setAttribute("id", "oferta");

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    switch (categoria) {
        case "remeras":
            cardBody.innerText = "¡POR ESTA SEMANA NAVIDEÑA 15% DE DESCUENTO LLEVANDO 3 REMERAS!";
            break;
        case "pantalones":
            cardBody.innerText = "¡POR ESTA SEMANA NAVIDEÑA 20% DE DESCUENTO EN TODOS LOS PANTALONES";
            break;

        case "zapatillas":
            cardBody.innerText = "¡POR ESTA SEMANA NAVIDEÑA COMPRA 3 ZAPATILLAS Y LLEVATE LA TERCERA GRATIS";
            break;
    
        default:
            cardBody.innerText = "Disfrutá 6 cuotas sin interés en todos los productos de la tienda.";
            break;
    }
    

    cardOferta.append(cardBody);

    banner.append(cardOferta);

    setTimeout(() => {

        document.querySelector("#oferta").remove();

    }, 10000);
};


//Checkout
function checkout(){
    let formularioFinal = document.querySelector("#formulario")
    document.querySelector("#modalFormulario").style.display = "block"
}

function cerrarFormulario(){
    document.querySelector("#modalFormulario").style.display = "none"
}


//Validar Formulario

function validarNumeroTelefono(numeroTelefonico){
    if(isNaN(numeroTelefonico)){
        alert("Ingrese por favor números solamente")
    }
}

function validarCampoVacio(valor, campo){
    if( valor === ""){
        alert(`${campo} no puede quedar vacio`)
    }
}

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    let numeroTelefonico = document.querySelector("#validaNumero").value;
    validarNumeroTelefono(numeroTelefonico);

    validarCampoVacio(numeroTelefonico, "Numero de telefono")
    
    let nombreUsuario = document.querySelector("#validarNombre").value;
    validarCampoVacio(nombreUsuario, "Nombre");

    let mailUsuario = document.querySelector("#validarMail").value;
    validarCampoVacio(mailUsuario, "Email");

    let lugarEntrega = document.querySelector("#validaLugar").value;
    validarCampoVacio(lugarEntrega, "Lugar de entrega")

    let fechaEntrega = document.querySelector("#validaFecha").value;
    validarCampoVacio(fechaEntrega, "Fecha de entrega")

    let MetodoPago = document.querySelector("#ValidaMetodo").value;
    validarCampoVacio(MetodoPago, "Metodo de pago")

})
