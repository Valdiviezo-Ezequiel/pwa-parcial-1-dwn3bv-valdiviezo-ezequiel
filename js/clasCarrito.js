class Carrito{
  
    productos;
   
    constructor(){
      this.productos = [];
    }
  
    //Agrega un producto al arreglo de productos
    agregarProducto(producto){
      this.productos.push(producto);
    }

    //Devuelve el arrays productos
    devolverProductos(){
      return this.productos;
    }
  
    //Devuelve la cantidad de producto dentro del arrays productos
    cantidadDeProductos(){
      return this.productos.length;
    }

    
     quitarProductoDelCarrito(idProducto){
       let producto = null; 
  
       this.productos.forEach(element => {
         if (element.id == idProducto){
           producto = element;
         }
       });
  
  
       this.productos.splice(this.productos.indexOf(producto), 1);
     }

    
    mostrarPrecioTotalDeLaCompra(){
        let total = 0;
        this.productos.forEach(p => {
          total += p.precio; 
        });
        return total; 
      }
      

    vaciarCarrito(){
      this.productos = [];
    }

}


